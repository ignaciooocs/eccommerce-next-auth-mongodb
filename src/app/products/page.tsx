import ListProducts from "./ListProducts";

export default async function Products () {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-cache' })
  const data = await res.json()

  if (res.status !== 200) throw new Error('Error al obtener los productos')

  return (
    <section className="flex justify-center">
      <ListProducts products={data}/>
    </section>
  )
}