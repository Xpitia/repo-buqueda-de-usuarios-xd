export default function Card({usuario}) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-center hover:scale-105 transition-transform duration-300 cursor-pointer">

            <img className="w-24 h-24 rounded-full mx-auto" src={usuario.foto} alt="avatar" />
            <h3 className="text-lg font-bold mt-2">{usuario.nombre}</h3>
            <p className="text-gray-600 text-sm">{usuario.perfil}</p>
            <p className="text-gray-600 text-xs mt-1 italic">{usuario.intereses}</p>
            <p className="text-gray-600 text-xs mt-1 text-blue-600">{usuario.correo}</p>

        </div>
    )
}
