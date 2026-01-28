"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

interface EmojiPickerProps {
  onChange: (emoji: string) => void;
}

export const EmojiPickerComponent = ({
  onChange,
}: EmojiPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Smile 
        className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
        />
      </PopoverTrigger>
      <PopoverContent 
        side="right" 
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <EmojiPicker 
          onEmojiClick={(emojiData) => {
          onChange(emojiData.emoji);
          setIsOpen(false);
          }}
          theme={resolvedTheme === "dark" ? Theme.DARK : Theme.LIGHT}
        />
      </PopoverContent>
    </Popover>
  )
}