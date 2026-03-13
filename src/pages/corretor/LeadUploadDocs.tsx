import { useState } from 'react';
import { Upload, FileText, CheckCircle2, Loader2, Link } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

type DocumentType = 
  | 'Certidão de Estado Civil'
  | 'Certidão de Dependentes'
  | 'Comprovante de Endereço'
  | 'Comprovante de Renda'
  | 'CTPS'
  | 'Extrato de FGTS'
  | 'RG e CPF'
  | 'Simulação Caixa'
  | 'Restrições';

const REQUIRED_DOCUMENTS: DocumentType[] = [
  'Certidão de Estado Civil',
  'Certidão de Dependentes',
  'Comprovante de Endereço',
  'Comprovante de Renda',
  'CTPS',
  'Extrato de FGTS',
  'RG e CPF',
  'Simulação Caixa',
  'Restrições'
];

export default function LeadUploadDocs() {
  const [uploadedDocs, setUploadedDocs] = useState<Partial<Record<DocumentType, { file: File, url: string }>>>({});
  const [uploadingDocType, setUploadingDocType] = useState<DocumentType | null>(null);
  
  const leadIdMock = "123-maria"; // Placeholder para um ID de Lead Real
  const bucketName = "projetocrm";

  const handleFileChange = async (docType: DocumentType, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDocType(docType);
    
    // Gerar nome único para não haver colisão: leadId/uuid-nomedoarquivo
    const fileExtension = file.name.split('.').pop();
    const filePath = `${leadIdMock}/${uuidv4()}.${fileExtension}`;

    try {
      // 1. Enviar pro Bucket 'projetocrm'
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // 2. Pegar a URL pública gerada para salvar no Banco depois
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      // 3. Salvar no estado
      setUploadedDocs(prev => ({ 
        ...prev, 
        [docType]: { file, url: publicUrl } 
      }));

    } catch (err: any) {
      console.error('Erro no upload:', err.message);
      alert('Erro ao enviar o PDF/Excel para o sistema. Verifique se o formato é válido e a internet permitida.');
    } finally {
      setUploadingDocType(null);
    }
  };

  const currentPercent = Math.round((Object.keys(uploadedDocs).length / REQUIRED_DOCUMENTS.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Documentação do Lead</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Cliente: <strong>Maria Fernandes</strong> - CPF: 123.456.789-00
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          Voltar ao Kanban
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between text-sm mb-2 font-medium">
          <span>Progresso do Dossiê</span>
          <span>{currentPercent}% Completo ({Object.keys(uploadedDocs).length} de {REQUIRED_DOCUMENTS.length})</span>
        </div>
        <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-in-out" 
            style={{ width: `${currentPercent}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {REQUIRED_DOCUMENTS.map((docType) => {
          const isUploaded = !!uploadedDocs[docType];
          const isThisUploading = uploadingDocType === docType;
          
          return (
            <div 
              key={docType} 
              className={`relative flex flex-col p-5 rounded-xl border transition-colors ${
                isUploaded ? 'bg-muted/30 border-primary/50' : 'bg-card hover:border-muted-foreground/30'
              }`}
            >
              <div className="flex items-start justify-between mb-4 gap-2">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${isUploaded ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    <FileText size={18} />
                  </div>
                  <h3 className="font-medium text-sm leading-tight max-w-[150px]">{docType}</h3>
                </div>
                {isUploaded ? (
                  <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />
                ) : (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20 flex-shrink-0 text-center">
                    Pendente
                  </span>
                )}
              </div>

              <div className="mt-auto">
                <label className={`cursor-pointer group flex items-center justify-center w-full h-10 rounded-md border text-sm font-medium transition-colors ${isThisUploading ? 'opacity-50 cursor-wait bg-muted' : 'hover:bg-accent'}`}>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.xls,.xlsx"
                    onChange={(e) => handleFileChange(docType, e)}
                    disabled={isThisUploading}
                  />
                  {isThisUploading ? (
                     <><Loader2 size={16} className="mr-2 animate-spin text-muted-foreground" /> Enviando...</>
                  ) : (
                     <><Upload size={16} className="mr-2 text-muted-foreground group-hover:text-foreground" /> {isUploaded ? 'Substituir' : 'Anexar .PDF / .XLS'}</>
                  )}
                </label>
                {isUploaded && (
                  <div className="text-xs text-muted-foreground mt-2 truncate flex items-center justify-center gap-1">
                    <span className="truncate max-w-[140px]">{uploadedDocs[docType]?.file.name}</span>
                    <a href={uploadedDocs[docType]?.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 flex-shrink-0" title="Ver Arquivo Online">
                      <Link size={12} />
                    </a>
                  </div>
                )}
               </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4 border-t">
         <button 
          disabled={currentPercent < 100}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 h-10 px-8 py-2"
        >
          Enviar Dossiê para o Gerente
        </button>
      </div>

    </div>
  );
}
