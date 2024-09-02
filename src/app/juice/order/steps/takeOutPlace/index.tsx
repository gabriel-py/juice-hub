'use client';
import styles from './styles.module.scss';
import { Control, Controller } from 'react-hook-form';
import { NewOrderFormData } from '../../page';

export interface TakeOutProps {
    control: Control<NewOrderFormData, any>;
}

const placesOptions = [
    { id: 1, label: 'Avenida Paulista' },
    { id: 2, label: 'Mercadão Municipal' },
    { id: 3, label: 'Parque do Ibirapuera' },
    { id: 4, label: 'Estação da Luz' },
    { id: 5, label: 'Rua Augusta' },
    { id: 6, label: 'Liberdade' },
    { id: 7, label: 'Pinacoteca de São Paulo' },
    { id: 8, label: 'MASP' },
    { id: 9, label: 'Museu do Futebol' },
    { id: 10, label: 'Shopping Eldorado' },
];

export default function TakeOut({ control }: TakeOutProps) {
    return (
        <div className={styles.container}>
            <span className={styles.containerTitle}>Selecione o local em que deseja fazer a retirada do suco: </span>
            <div className={styles.inputArea}>
                <Controller
                    name="takeOutLocal"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                        <>
                            {placesOptions.map((place) => (
                                <label key={place.id} className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value={place.id}
                                        checked={field.value === place.id}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                    {place.label}
                                </label>
                            ))}
                        </>
                    )}
                />
            </div>
            <button type='submit' className={styles.nextStepButton} style={{ marginTop: "16px" }}>Finalizar pedido</button>
        </div>
    );
}
