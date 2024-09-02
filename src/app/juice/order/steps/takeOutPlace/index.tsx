'use client';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { Control, Controller } from 'react-hook-form';
import { NewOrderFormData } from '../../page';

export interface TakeOutProps {
    control: Control<NewOrderFormData, any>;
}

export default function TakeOut({ control }: TakeOutProps) {
    const [placesOptions, setPlacesOptions] = useState<{ id: number; label: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPlaces() {
            try {
                const response = await fetch('http://localhost:3000/api/places');
                if (!response.ok) {
                    throw new Error('Failed to fetch places');
                }
                const data = await response.json();
                setPlacesOptions(data);
            } catch (err) {
                console.error('Erro ao buscar places:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchPlaces();
    }, []);

    if (loading) return <p>Loading...</p>;

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
