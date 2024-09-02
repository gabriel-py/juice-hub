'use client'
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import BasicData from './steps/basicData';
import { Step } from '@mui/material';
import { useEffect, useState } from 'react';
import Flavors from './steps/flavors';
import TakeOut from './steps/takeOutPlace';
import ProgressBar from '../(components)/ProgressBar';

export interface NewOrderFormData {
    name: string;
    email: string;
    phone_number: string;
    takeOutLocal: number;
    flavors: number[];
}

interface Step {
    step: number;
    pageTitle: string;
    component: React.ReactNode;
}

export default function Order() {
    const [currentStepID, setCurrentStepID] = useState(1);
    const [currentStep, setCurrentStep] = useState<Step>();

    const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm<NewOrderFormData>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            phone_number: '',
            takeOutLocal: 0,
            flavors: [],
        },
    });

    const maxSteps = 3;

    const onNextStep = () => {
        const next = currentStepID + 1;
        if(next > maxSteps){
            return;
        }
        setCurrentStepID(next);
    }

    const onSubmit = (data: NewOrderFormData) => {
        console.log(data)
        // dispatch(createUser(data));
    };

    const steps: Step[] = [
        {
            step: 1,
            pageTitle: 'Seus dados',
            component: <BasicData control={control} onNextStep={onNextStep} />
        },
        {
            step: 2,
            pageTitle: 'Sabores',
            component: <Flavors control={control} onNextStep={onNextStep} />
        },
        {
            step: 3,
            pageTitle: 'Local de retirada',
            component: <TakeOut control={control} />
        },
    ]

    useEffect(() => {
        const targetStep = steps?.find((step)=> step.step == currentStepID)
        if(targetStep){
            setCurrentStep(targetStep);
        }
    }, [currentStepID]);

    if(!currentStep){
        return;
    }

    return (
        <div className={styles.content}>
            <h1 className={styles.pageTitle}>{currentStep?.pageTitle}</h1>
            <ProgressBar progress={currentStep?.step / steps?.length * 100} />
            <h2>Passo {currentStep?.step} de {steps?.length}</h2>
            <div className={styles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {currentStep?.component}
                </form>
            </div>
        </div>
    );
}
