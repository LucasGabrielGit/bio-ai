import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface DateRange {
  startDate: Date;
  endDate: Date;
  label: string;
}

interface DateRangeSelectorProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const predefinedRanges = [
  {
    label: 'Últimos 7 dias',
    getValue: () => ({
      startDate: startOfDay(subDays(new Date(), 7)),
      endDate: endOfDay(new Date()),
      label: 'Últimos 7 dias'
    })
  },
  {
    label: 'Últimos 30 dias',
    getValue: () => ({
      startDate: startOfDay(subDays(new Date(), 30)),
      endDate: endOfDay(new Date()),
      label: 'Últimos 30 dias'
    })
  },
  {
    label: 'Últimos 90 dias',
    getValue: () => ({
      startDate: startOfDay(subDays(new Date(), 90)),
      endDate: endOfDay(new Date()),
      label: 'Últimos 90 dias'
    })
  },
  {
    label: 'Último ano',
    getValue: () => ({
      startDate: startOfDay(subDays(new Date(), 365)),
      endDate: endOfDay(new Date()),
      label: 'Último ano'
    })
  }
];

export function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRangeSelect = (range: DateRange) => {
    onChange(range);
    setIsOpen(false);
  };

  const formatDateRange = (range: DateRange) => {
    if (range.label !== 'Personalizado') {
      return range.label;
    }
    
    const start = format(range.startDate, 'dd/MM/yyyy', { locale: ptBR });
    const end = format(range.endDate, 'dd/MM/yyyy', { locale: ptBR });
    return `${start} - ${end}`;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{formatDateRange(value)}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {predefinedRanges.map((range) => (
          <DropdownMenuItem
            key={range.label}
            onClick={() => handleRangeSelect(range.getValue())}
            className="cursor-pointer"
          >
            {range.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Hook para gerenciar o estado do seletor de data
export function useDateRange(initialDays: number = 30) {
  const [dateRange, setDateRange] = useState<DateRange>(() => ({
    startDate: startOfDay(subDays(new Date(), initialDays)),
    endDate: endOfDay(new Date()),
    label: `Últimos ${initialDays} dias`
  }));

  return {
    dateRange,
    setDateRange,
    // Função para obter parâmetros de query
    getQueryParams: () => ({
      startDate: dateRange.startDate.toISOString(),
      endDate: dateRange.endDate.toISOString()
    })
  };
}