// src/features/home/components/PendingTasks.tsx
import React from "react";
import { NeonCard } from "../../../components/ui/NeonCard";
import { NeonButton } from "../../../components/ui/NeonButton";
import { useNavigate } from "react-router-dom";

interface PendingTask {
  type: "music" | "table";
  title: string;
  description: string;
  link: string;
}

interface Props {
  tasks: PendingTask[];
}

export const PendingTasks: React.FC<Props> = ({ tasks }) => {
  const navigate = useNavigate();

  if (tasks.length === 0) return null;

  return (
    <NeonCard className="mb-6 cursor-default">
      <h3 className="text-base font-semibold text-white mb-2">
        Cosas que podés completar
      </h3>
      <p className="text-xs text-cyan-100/70 mb-3">
        Mientras tanto, podés ir llenando estos datos para que la fiesta salga
        mejor.
      </p>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.type}
            className="flex items-center justify-between gap-3"
          >
            <div>
              <p className="text-sm font-medium text-white">
                {task.title}
              </p>
              <p className="text-xs text-gray-400">{task.description}</p>
            </div>
            <NeonButton
              variant="secondary"
              onClick={() => navigate(task.link)}
            >
              Ir
            </NeonButton>
          </div>
        ))}
      </div>
    </NeonCard>
  );
};
