// src/features/music/components/MusicCommentCard.tsx
import React from "react";
import { NeonCard } from "../../../components/ui/NeonCard";
import { NeonButton } from "../../../components/ui/NeonButton";
import { Save, Trash2 } from "lucide-react";

interface Props {
  comment: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onClear?: () => void;
}

export const MusicCommentCard: React.FC<Props> = ({
  comment,
  onChange,
  onSave,
  onClear,
}) => {
  const handleClear = () => {
    if (!onClear) return;
    onClear();
  };

  return (
    <NeonCard className="mb-6 cursor-default">
      <h3 className="text-sm font-semibold text-white mb-2">
        Comentario para el DJ / música
      </h3>
      <p className="text-xs text-gray-400 mb-2">
        Contale a Luca qué tipo de música te gustaría escuchar. Este comentario
        lo ves vos y se usa sólo para armar la playlist (no es un muro público).
      </p>
      <textarea
        value={comment}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-[#111] border border-[#333] rounded-md px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400"
        placeholder="Ej: Cumbia tranquila para la cena, reggaeton movido después, algo de rock nacional..."
      />
      <div className="mt-3 flex justify-between gap-2">
        <div>
          {onClear && comment.trim() && (
            <NeonButton
              type="button"
              variant="ghost"
              onClick={handleClear}
              className="text-xs"
            >
              <Trash2 size={14} className="mr-1" />
              Borrar comentario
            </NeonButton>
          )}
        </div>
        <NeonButton
          type="button"
          variant="secondary"
          onClick={onSave}
          className="text-xs"
        >
          <Save size={14} className="mr-1" />
          Guardar comentario
        </NeonButton>
      </div>
    </NeonCard>
  );
};
