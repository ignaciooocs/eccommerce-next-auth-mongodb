export const getCategories = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/category')
    return await res.json()
  } catch (error) {
    console.log('Error al obtener las categorias')
    throw error
  }
}