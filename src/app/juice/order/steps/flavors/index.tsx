'use client';
import styles from './styles.module.scss';
import { Control, Controller } from 'react-hook-form';
import { NewOrderFormData } from '../../page';

export interface FlavorsProps {
    control: Control<NewOrderFormData, any>;
    onNextStep: () => void;
}

// TO DO - read this from api
const flavorOptions = [
    { id: 1, label: 'Laranja' },
    { id: 2, label: 'Morango' },
    { id: 3, label: 'Manga' },
    { id: 4, label: 'Abacaxi' },
    { id: 5, label: 'Acerola' },
    { id: 6, label: 'Maracujá' },
    { id: 7, label: 'Guaraná' },
    { id: 8, label: 'Açai' },
    { id: 9, label: 'Uva' },
    { id: 10, label: 'Melancia' },
];

export default function Flavors({ control, onNextStep }: FlavorsProps) {
    return (
        <div className={styles.container}>
            <span className={styles.containerTitle}>Selecione os sabores que deseja dentre as seguintes opções: </span>
            <div className={styles.inputArea}>
                {flavorOptions.map((flavor) => (
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
