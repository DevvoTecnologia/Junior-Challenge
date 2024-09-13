import {
  CaretSortIcon,
  CheckIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ComponentProps, useState } from 'react';
import { forgersOptions } from '@/constants/forgersOptions';

export interface ComboboxProps extends ComponentProps<'button'> {
  error?: string;
  setValue: (
    name: 'name' | 'power' | 'bearer' | 'forgedBy' | 'image',
    value: string,
  ) => void;
}

export const Combobox = ({
  error,
  defaultValue,
  setValue,
  ...props
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [value, setLocalValue] = useState('');

  const handleSelect = (currentValue: string) => {
    const selectedValue = currentValue === value ? '' : currentValue;
    setLocalValue(selectedValue);
    setValue('forgedBy', selectedValue);
    setOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="combobox"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'justify-between px-3 text-base text-gray-500 font-normal',
              error && 'border-red-900',
            )}
            {...props}
          >
            {value ? (
              <span className="text-gray-200">
                {forgersOptions.find(option => option.value === value)?.label}
              </span>
            ) : (
              'Forjado por...'
            )}
            <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="">
          <Command>
            <CommandInput placeholder="Procurar..." className="h-9" />
            <CommandList>
              <CommandEmpty>Nada encontrado.</CommandEmpty>
              <CommandGroup>
                {forgersOptions.map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                  >
                    {option.label}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        value === option.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <div className="flex items-center gap-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </>
  );
};
