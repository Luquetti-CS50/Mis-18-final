// src/features/music/components/MusicCommentCard.tsx
import React from "react";
import { NeonCard } from "../../../components/ui/NeonCard";
import { NeonButton } from "../../../components/ui/NeonButton";
import { Save } from "lucide-react";

interface Props {
  comment: string;
  onChange: (value: string) => void;
  onSave: () => void;
}

export const MusicCommentCard: React.FC<Props> = ({
  comment,
  onChange,
  onSave,
}) => {
  return (
    <NeonCard className="mb-6 cursor-default">
      <h3 className="text-sm font-semibold text-white mb-2">
        ¿Qué querés escuchar?
      </h3>
      <p className="text-xs text-gray-400 mb-3">
        Podés describir estilos, artistas, momentos (cena, baile, etc).
      </p>
      <textarea
        value={comment}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-[#111] border border-[#333] rounded-lg p-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400"
        placeholder="Ej: Cumbia, reggaeton tranquilo para la cena, algo de rock nacional..."
      />
      <div className="mt-3 flex justify-end">
        <NeonButton variant="secondary" onClick={onSave}>
          <Save size={14} className="mr-1" />
          Guardar comentario
        </NeonButton>
      </div>
    </NeonCard>
  );
};
