'use client';
import { useState, useEffect } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import styles from './styles.module.scss';
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

    const validateDateAndTime = (dateValue: string, timeValue: string) => {
        const now = new Date();
        const offset = -3 * 60 * 60 * 1000;
        const nowInSaoPaulo = new Date(now.getTime() + offset);
        const nowDate = new Date(nowInSaoPaulo.toDateString());

        if (!dateValue || !timeValue) {
            return true;
        }

        const selectedDate = new Date(dateValue);
        const selectedDateTime = new Date(`${dateValue}T${timeValue}`);
        const selectedDateInSaoPaulo = new Date(selectedDate.getTime() + offset);
        const selectedDateTimeInSaoPaulo = new Date(selectedDateTime.getTime() + offset);

        if (selectedDateInSaoPaulo < nowDate) {
            return 'A data deve ser hoje ou no futuro';
        }

        if (selectedDateInSaoPaulo.getTime() === nowDate.getTime() && selectedDateTimeInSaoPaulo.getTime() < nowInSaoPaulo.getTime()) {
            return 'O horário deve ser agora ou no futuro';
        }

        return true;
    };

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

            <span className={styles.containerTitle}>Selecione o dia e horário para a retirada:</span>
            <div className={styles.dateTimeInputArea}>
                <Controller
                    name="scheduledDate"
                    control={control}
                    defaultValue=""
                    rules={{
                        validate: (value) => validateDateAndTime(value, 'date'),
                    }}
                    render={({ field, fieldState }) => (
                        <div className={styles.inputSection}>
                            <input
                                type="date"
                                {...field}
                                className={styles.input}
                            />
                            {fieldState.error && <p className={styles.error}>{fieldState.error.message}</p>}
                        </div>
                    )}
                />
                <Controller
                    name="scheduledTime"
                    control={control}
                    defaultValue=""
                    rules={{
                        validate: (value) => validateDateAndTime(value, 'time'),
                    }}
                    render={({ field, fieldState }) => (
                        <div className={styles.inputSection}>
                            <input
                                type="time"
                                {...field}
                                className={styles.input}
                            />
                            {fieldState.error && <p className={styles.error}>{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <button type='submit' className={styles.nextStepButton} style={{ marginTop: "16px" }}>Finalizar pedido</button>
        </div>
    );
}
