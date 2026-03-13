import type { TaskPriority, TaskStatus } from "@open-learn/api/modules/task/task.schema";

import { PlusIcon, SearchIcon } from "lucide-react";

import { Button } from "@open-learn/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@open-learn/ui/components/dropdown-menu";
import { Input } from "@open-learn/ui/components/input";

import {
  TASK_COPY,
  TASK_PRIORITY_LABELS,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_LABELS,
  TASK_STATUS_OPTIONS,
} from "../constants";

interface TaskTableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedStatuses: TaskStatus[];
  selectedPriorities: TaskPriority[];
  onToggleStatus: (status: TaskStatus) => void;
  onTogglePriority: (priority: TaskPriority) => void;
  onAddTask: () => void;
}

function getFilterLabel(label: string, count: number) {
  return count > 0 ? `${label} (${count})` : label;
}

export function TaskTableToolbar({
  search,
  onSearchChange,
  selectedStatuses,
  selectedPriorities,
  onToggleStatus,
  onTogglePriority,
  onAddTask,
}: TaskTableToolbarProps) {
  return (
    <div className="flex flex-col justify-between gap-3 border-b border-border/60 px-4 py-4 lg:flex-row lg:items-center">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-64 flex-1 lg:w-64 lg:flex-none">
          <SearchIcon className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={TASK_COPY.searchPlaceholder}
            className="w-full pl-8"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1.5">
              <PlusIcon className="size-3.5" />
              {getFilterLabel("Status", selectedStatuses.length)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {TASK_STATUS_OPTIONS.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => onToggleStatus(status)}
              >
                {TASK_STATUS_LABELS[status]}
              </DropdownMenuCheckboxItem>
            ))}
            {selectedStatuses.length > 0 ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => selectedStatuses.forEach(onToggleStatus)}>
                  Clear filters
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1.5">
              <PlusIcon className="size-3.5" />
              {getFilterLabel("Priority", selectedPriorities.length)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuLabel>Filter by priority</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {TASK_PRIORITY_OPTIONS.map((priority) => (
              <DropdownMenuCheckboxItem
                key={priority}
                checked={selectedPriorities.includes(priority)}
                onCheckedChange={() => onTogglePriority(priority)}
              >
                {TASK_PRIORITY_LABELS[priority]}
              </DropdownMenuCheckboxItem>
            ))}
            {selectedPriorities.length > 0 ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => selectedPriorities.forEach(onTogglePriority)}>
                  Clear filters
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap items-center gap-2 lg:justify-end">
        <Button onClick={onAddTask}>{TASK_COPY.addTask}</Button>
      </div>
    </div>
  );
}
