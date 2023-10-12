'use client'
import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'
import DynamicField from './DynamicField'
import { getCategories } from '@/services/category'

export default function PostProduct () {
  const initial = {
    name: '',
    description: '',
    material: '',
    brand: '',
    price: 0,
    stock: 0,
    size: [''],
    color: [''],
    details: [''],
    image: [''],
    category: []
  }

  const [product, setProduct] = useState(initial)

  const { data, isLoading, error } = useQuery({
    queryFn: getCategories,
    queryKey: ['Categories']
  })

  if (isLoading) return <section>Loading...</section>
  if (error) return <section>error</section>

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleCategories = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setProduct({
        ...product,
        category: [...product.category, name]
      });
    } else {
      setProduct(prevProducto => ({
        ...prevProducto,
        category: prevProducto.category.filter(catId => catId !== name)
      }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number, campo: string) => {
    const { value } = e.target;
    setProduct(prevProducto => {
      const newValues = [...prevProducto[campo]];
      newValues[index] = value;
      return {
        ...prevProducto,
        [campo]: newValues
      };
    });
  };

  const addField = (campo: string) => {
    setProduct(prevProducto => ({
      ...prevProducto,
      [campo]: [...prevProducto[campo], ''] // Agregar un nuevo campo vacío al array
    }));
  };

  const deleteField = (index: number, campo: string) => {
    setProduct(prevProduct => {
      const newValues = [...prevProduct[campo]];
      newValues.splice(index, 1); // Eliminar el campo en el índice especificado
      return {
        ...prevProduct,
        [campo]: newValues
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setProduct({...product, price: Number(product.price), stock: Number(product.stock)})
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      })
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log('No se agrego el producto ' + error)
     throw error 
    }
  };

  return (
    <section>
      <h4>Esta es la seccion para publicar productos</h4>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <section className="flex flex-col gap-2 w-4/5">
          <input className="p-3 bg-slate-100 rounded-md" type="text" name='name' placeholder="Nombre del producto" onChange={onchange} />
          <input className="p-3 bg-slate-100 rounded-md" type="text" name='description' placeholder="Descripcion del producto" onChange={onchange} />
          <input className="p-3 bg-slate-100 rounded-md" type="text" name='material' placeholder="material del producto" onChange={onchange} />
          <input className="p-3 bg-slate-100 rounded-md" type="text" name='brand' placeholder="Marca del producto" onChange={onchange} />
          <label>precio</label>
          <input className="p-3 bg-slate-100 rounded-md" type="number" name='price' onChange={onchange} />
          <label>stock</label>
          <input className="p-3 bg-slate-100 rounded-md" type="number" name='stock' onChange={onchange} />
        </section>

        <section className="flex flex-col gap-2 w-4/5">
          <DynamicField values={product.details} handleChange={handleChange} addField={addField} deleteField={deleteField} name='details'/>
          <DynamicField values={product.size} handleChange={handleChange} addField={addField} deleteField={deleteField} name='size'/>
          <DynamicField values={product.color} handleChange={handleChange} addField={addField} deleteField={deleteField} name='color'/>
          <DynamicField values={product.image} handleChange={handleChange} addField={addField} deleteField={deleteField} name='image'/>
        </section>

          <p>Selecciona las categorias del producto</p>
        <section className="flex gap-2 w-4/5 flex-wrap p-8">
        {data.map((cat: { name: string, _id: string }) => (
          <label key={cat._id} className={`flex gap-2 border p-2 ${product.category.includes(cat._id) && 'border-blue-400 border-2'}`}>
            {cat.name}
            <input
              type="checkbox"
              name={cat._id}
              checked={product.category.includes(cat._id)}
              onChange={handleCategories}
            />
          </label>
        ))}
      </section>
          <button className='p-2 bg-blue-500 text-white rounded-md my-2'>enviar</button>
      </form>
    </section>
  )
}