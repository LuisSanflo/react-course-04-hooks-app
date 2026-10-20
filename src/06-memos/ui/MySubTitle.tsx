import { memo } from "react";

interface Props {
    subtitle: string;
    // callMyAPI: (myValue: string) => void;
    callMyAPI: () => void;
}

export const MySubTitle = memo(({subtitle, callMyAPI}: Props) => {
    console.log('MySubTitle re-render');
    console.log('Tarea super pesada');
    return (
        <>
            <h6 className="text-2xl font-bold">{subtitle}</h6>

            <button
                className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer"
                onClick={callMyAPI}
            >
                Llamar a función
            </button>
        </>
    );
})