'use client'
import styles from './styles.module.scss';
import { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { NewOrderFormData } from '../../page';

export interface BasicDataProps {
    control: Control<NewOrderFormData, any>;
    onNextStep: () => void;
}

export default function BasicData({ control, onNextStep }: BasicDataProps) {
    return (
        <div className={styles.container}>
            <div className={styles.inputArea}>
                <span className={styles.label}>Nome *</span>
                <Controller
                    name='name'
                    defaultValue=""
                    control={control}
                    render={({ field, fieldState }) => (
                    <>
                        <input
                            type='name'
                            placeholder='Digite seu e-mail...'
                            className={styles.input}
                            {...field}
                        />
                        {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
                    </>
                    )}
                    rules={{
                        required: 'Nome é obrigatório',
                    }}
                />
            </div>
            <div className={styles.inputArea}>
                <span className={styles.label}>E-mail *</span>
                <Controller
                    name='email'
                    defaultValue=""
                    control={control}
                    render={({ field, fieldState }) => (
                    <>
                        <input
                            type='email'
                            placeholder='Digite seu e-mail...'
                            className={styles.input}
                            {...field}
                        />
                        {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
                    </>
                    )}
                    rules={{
                    required: 'E-mail é obrigatório',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'E-mail inválido'
                    }
                    }}
                />
            </div>
            <div className={styles.inputArea}>
                <span className={styles.label}>Celular *</span>
                <Controller
                    name='phone_number'
                    defaultValue=""
                    control={control}
                    render={({ field, fieldState }) => (
                    <>
                        <input
                            type='text'
                            placeholder='21 9 9999-9999'
                            className={styles.input}
                            {...field}
                        />
                        {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
                    </>
                    )}
                    rules={{
                        required: 'Telefone é obrigatório',
                        pattern: {
                            value: /^\d{8,15}$/,
                            message: 'Formato de telefone inválido'
                        }
                    }}
                />
            </div>
            <button type='button' className={styles.nextStepButton} onClick={onNextStep} style={{ marginTop: "16px" }}>Próximo Passo</button>
        </div>
    );
}
