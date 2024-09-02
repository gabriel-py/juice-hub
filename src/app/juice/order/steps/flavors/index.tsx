'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Control, Controller } from 'react-hook-form';
import { NewOrderFormData } from '../../page';

export interface FlavorsProps {
    control: Control<NewOrderFormData, any>;
    onNextStep: () => void;
}

interface FlavorOption {
    id: number;
    label: string;
}

export default function Flavors({ control, onNextStep }: FlavorsProps) {
    const [flavors, setFlavors] = useState<FlavorOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFlavors = async () => {
            try {
                const response = await fetch('/api/flavors');
                const data = await response.json();
                setFlavors(data);
            } catch (error) {
                console.error('Erro ao buscar sabores:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlavors();
    }, []);

    if (loading) {
        return <div>Carregando sabores...</div>;
    }

    return (
        <div className={styles.container}>
            <span className={styles.containerTitle}>Selecione os sabores que deseja dentre as seguintes opções: </span>
            <div className={styles.inputArea}>
                {flavors.map((flavor) => (
                    <Controller
                        key={flavor.id}
                        name={`flavors`}
                        control={control}
                        render={({ field }) => (
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    value={flavor.id}
                                    checked={field.value?.includes(flavor.id) || false}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        if (isChecked) {
                                            field.onChange([...field.value, flavor.id]);
                                        } else {
                                            field.onChange(field.value.filter((id) => id !== flavor.id));
                                        }
                                    }}
                                />
                                {flavor.label}
                            </label>
                        )}
                    />
                ))}
            </div>
            <button type='button' className={styles.nextStepButton} onClick={onNextStep} style={{ marginTop: "16px" }}>Próximo Passo</button>
        </div>
    );
}
