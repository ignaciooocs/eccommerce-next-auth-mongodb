import Image from "next/image";

export default async function Home() {
  // const state = true
  // if (state) throw new Error('Ocurrio un error')

  return (
    <section>
      esta es la pagina principal
      <Image src='https://th.bing.com/th/id/OIG.bvAjdUSB.UnsjBCvVuGZ?pid=ImgGn' alt="zapatillas nike" height={300} width={200}/>
      <Image src='https://th.bing.com/th/id/OIG.iuwwRkRhuvrK4XS0UYM.?pid=ImgGn' alt="zapatillas nike negra" height={200} width={200}/>
      <Image src='https://th.bing.com/th/id/OIG.rAO6.wnfM8T5isMLV6bK?pid=ImgGn' alt="zapatillas nike ngr" height={200} width={200}/>
    </section>
  )
}
