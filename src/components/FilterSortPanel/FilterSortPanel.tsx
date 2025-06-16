import React, { useState, useEffect } from 'react';
import {
    PanelContainer,
    Section,
    ToggleButton,
    FiltersRow,
    CollapseSection,
    ResetButton
} from './FilterSortPanel.styles';

export interface LaptopFilters {
    brand?: string[];
    ram?: number[];
    ssd?: string[];
    priceRange?: [number, number];
    sortBy?: 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc' ;
    query?: string;
}

interface FilterSortPanelProps {
    filters: LaptopFilters;
    onChange: (filters: LaptopFilters) => void;
    onReset: () => void;
}

type FilterKeys = 'brand' | 'ram' | 'ssd';
type FilterElementType<K extends FilterKeys> =
    K extends 'brand' ? string :
        K extends 'ram' ? number :
            K extends 'ssd' ? string :
                never;

const availableBrands = ['Acer', 'Apple', 'Asus', 'Dell', 'HP', 'Lenovo', 'Microsoft', 'MSI'];
const availableRamOptions = [8, 16, 32, 64];
const availableSsdOptions = ['128GB', '256GB', '512GB', '1TB'];

const FilterSortPanel: React.FC<FilterSortPanelProps> = ({ filters, onChange, onReset }) => {
    const [localFilters, setLocalFilters] = useState<LaptopFilters>({
        brand: filters.brand || [],
        ram: filters.ram || [],
        ssd: filters.ssd || [],
        priceRange: filters.priceRange ?? [0, 100000],
        sortBy: undefined,
        query: filters.query || ''
    });

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setLocalFilters({
            brand: filters.brand || [],
            ram: filters.ram || [],
            ssd: filters.ssd || [],
            priceRange: filters.priceRange ?? [0, 100000],
            sortBy: filters.sortBy ?? undefined,
            query: filters.query || ''
        });
    }, [filters]);

    const toggleArrayValue = <K extends FilterKeys>(key: K, value: FilterElementType<K>) => {
        const currentArray = localFilters[key] || [];
        const typedArray = currentArray as FilterElementType<K>[];

        const exists = typedArray.includes(value);
        const newArray = exists ? typedArray.filter(v => v !== value) : [...typedArray, value];

        const updatedFilters = { ...localFilters, [key]: newArray };
        setLocalFilters(updatedFilters);
        onChange(updatedFilters);
    };

    const handlePriceChange = (index: 0 | 1, value: number) => {
        const currentRange: [number, number] = localFilters.priceRange ?? [0, 100000];
        let [min, max] = currentRange;

        if (index === 0) min = Math.min(value, max);
        else max = Math.max(value, min);

        const updatedFilters = { ...localFilters, priceRange: [min, max] as [number, number] };
        setLocalFilters(updatedFilters);
        onChange(updatedFilters);
    };

    const handleSortChange = (value: LaptopFilters['sortBy']) => {
        const updatedFilters = { ...localFilters, sortBy: value };
        setLocalFilters(updatedFilters);
        onChange(updatedFilters);
    };

    const handleReset = () => {
        onReset();
        setExpanded(false);
    };

    return (
        <PanelContainer>
            <ToggleButton onClick={() => setExpanded(!expanded)}>
                {expanded ? '▲ Сховати фільтри' : '▼ Показати фільтри'}
            </ToggleButton>

            <ResetButton onClick={handleReset}>Скинути фільтри</ResetButton>

            {expanded && (
                <CollapseSection>
                    <FiltersRow >
                        <Section >
                            <h4>Бренд</h4>
                            {availableBrands.map(brand => (
                                <label key={brand}>
                                    <input
                                        type="checkbox"
                                        checked={localFilters.brand?.includes(brand) || false}
                                        onChange={() => toggleArrayValue('brand', brand)}
                                    />
                                    {brand}
                                </label>
                            ))}
                        </Section>

                        <Section >
                            <h4>RAM</h4>
                            {availableRamOptions.map(ram => (
                                <label key={ram}>
                                    <input
                                        type="checkbox"
                                        checked={localFilters.ram?.includes(ram) || false}
                                        onChange={() => toggleArrayValue('ram', ram)}
                                    />
                                    {ram} GB
                                </label>
                            ))}
                        </Section>

                        <Section >
                            <h4>SSD</h4>
                            {availableSsdOptions.map(ssd => (
                                <label key={ssd}>
                                    <input
                                        type="checkbox"
                                        checked={localFilters.ssd?.includes(ssd) || false}
                                        onChange={() => toggleArrayValue('ssd', ssd)}
                                    />
                                    {ssd}
                                </label>
                            ))}
                        </Section>

                        <Section>
                            <h4>Ціна</h4>
                            <label>
                                Мін:
                                <input
                                    type="number"
                                    value={localFilters.priceRange?.[0]}
                                    onChange={e => handlePriceChange(0, Number(e.target.value))}
                                />
                            </label>
                            <label>
                                Макс:
                                <input
                                    type="number"
                                    value={localFilters.priceRange?.[1]}
                                    onChange={e => handlePriceChange(1, Number(e.target.value))}
                                />
                            </label>
                        </Section>

                        <Section>
                            <h4>Сортування</h4>
                            <select
                                value={localFilters.sortBy ?? ''}
                                onChange={e => handleSortChange(e.target.value === '' ? undefined : e.target.value as LaptopFilters['sortBy'])}
                            >
                                <option value="">Без сортування</option>
                                <option value="price-asc">Ціна: від дешевих до дорогих</option>
                                <option value="price-desc">Ціна: від дорогих до дешевих</option>
                                <option value="title-asc">Назва: від А до Я</option>
                                <option value="title-desc">Назва: від Я до А</option>
                            </select>
                        </Section>
                    </FiltersRow>

                    {/*<button onClick={handleReset}>Скинути фільтри</button>*/}
                </CollapseSection>
            )}
        </PanelContainer>
    );
};

export default FilterSortPanel;
