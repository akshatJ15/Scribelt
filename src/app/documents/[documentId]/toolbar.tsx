"use client";
import {
  LucideIcon,
  Undo2Icon,
  Redo2Icon,
  PrinterIcon,
  SpellCheckIcon,
  ItalicIcon,
  BoldIcon,
  UnderlineIcon,
  MessageSquarePlusIcon,
  ListTodoIcon,
  RemoveFormattingIcon,

} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

const toolbar = () => {
  const { editor } = useEditorStore();
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => {
          console.log("undo");
          editor?.chain().focus().undo().run();
        },
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => {
          console.log("redo");
          editor?.chain().focus().redo().run();
        },
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => {
          console.log("print");
          window.print();
        },
      },
      {
        label: "Spellcheck",
        icon: SpellCheckIcon,
        onClick: () => {
          console.log("spellcheck");
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "true" ? "false" : "true"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => {
          console.log("bold");
          editor?.chain().focus().toggleBold().run();
        },
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => {
          console.log("italic");
          editor?.chain().focus().toggleItalic().run();
        },
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => {
          console.log("underline");
          editor?.chain().focus().toggleUnderline().run();
        },
        isActive: editor?.isActive("underline"),
      },
    ],
    [
        {
            label: "Comment",
            icon: MessageSquarePlusIcon,
            onClick: () => {
                console.log("comment");
            },
            isActive: editor?.isActive("comment"),
        },
        {
            label: "List Todo",
            icon: ListTodoIcon,
            onClick: () => {
                console.log("comment");
                editor?.chain().focus().toggleTaskList().run();
            },
            isActive: editor?.isActive("taskList"),
        },
        {
            label: "Remove Formatting",
            icon: RemoveFormattingIcon,
            onClick: () => {
                console.log("comment");
                editor?.chain().focus().unsetAllMarks().run();
            },
        },
    ]
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => {
        return <ToolbarButton {...item} key={item.label} />;
      })}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => {
        return <ToolbarButton {...item} key={item.label} />;
      })}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[2].map((item) => {
        return <ToolbarButton {...item} key={item.label} />;
      })}
    </div>
  );
};

export default toolbar;
