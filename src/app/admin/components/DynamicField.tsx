import { ChangeEvent } from "react";

interface Props {
  values: string[]
  handleChange: (e: ChangeEvent<HTMLInputElement>, index: number, campo: string) => void,
  addField: (name: string) => void,
  deleteField: (index: number, campo: string) => void,
  name: string
}

export default function DynamicField ({ values, handleChange, addField, deleteField, name }: Props){
  return (
    <section className="flex flex-col gap-2 p-3">
      <p>Ingresa: {name}</p>
      {values.map((valor, index) => (
        <label key={index}>
          <input
            className="p-3 bg-slate-100 rounded-md"
            type="text"
            value={valor}
            placeholder={name}
            onChange={(e) => handleChange(e, index, name)}
          />
          <button className="p-2 bg-red-500 text-white rounded-md" type="button" onClick={() => deleteField(index, name)}>Eliminar</button>
        </label>
      ))}
      <section>
        <button className="p-2 bg-blue-500 text-white rounded-md" type="button" onClick={() => addField(name)}>Agregar</button>
      </section>
    </section>
  );
};