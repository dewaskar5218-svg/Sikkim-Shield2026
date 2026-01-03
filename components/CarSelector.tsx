import React from 'react';
import { VEHICLES } from '../constants';
import { Vehicle } from '../types';
import { Car } from 'lucide-react';

interface CarSelectorProps {
  selectedId?: string;
  onSelect: (car: Vehicle) => void;
}

const CarSelector: React.FC<CarSelectorProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {VEHICLES.map((v) => (
        <button
          key={v.id}
          onClick={() => onSelect(v)}
          className={`p-6 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3 border ${
            selectedId === v.id 
              ? 'border-cyan-500 bg-cyan-500/10' 
              : 'border-white/10 bg-white/5 hover:border-white/20'
          }`}
        >
          <Car className={`w-8 h-8 ${selectedId === v.id ? 'text-cyan-400' : 'text-slate-400'}`} />
          <div className="text-center">
            <h3 className="font-bold text-lg">{v.brand} {v.model}</h3>
            <p className="text-sm text-slate-400">{v.type} • {v.year}</p>
          </div>
        </button>
      ))}
    </div>
  );
};
export default CarSelector;