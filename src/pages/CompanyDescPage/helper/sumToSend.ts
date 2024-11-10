import { useRubFormat } from './../../../hooks/useRubFormat';
export const sumToSend = (salaryToSend: number, interest: number) => {
    const sum = interest !== 0 ? salaryToSend / interest : 0;

    const sumToDisplay = interest !== 0 ? useRubFormat(salaryToSend / interest).format : useRubFormat(0).format;

    return { sum, sumToDisplay };
};
