import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mascota from 'App/Models/Mascota'

export default class MascotasController {
    public async ingresarMascota({ request, response }: HttpContextContract) {
        const nueva_mascota = request.only(['codigo_animal', 'nombre_animal', 'especie', 'raza', 'genero', 'edad']);
        try {
            const mascota_existe = await Mascota.findBy('codigo_animal', nueva_mascota.codigo_animal);
            if (mascota_existe) {
                return response.status(400).send({ mensaje: 'La mascota ya existe' });
            } else {
                const mascota = await Mascota.create(nueva_mascota);
                response.status(200).send({ mensaje: 'Mascota ingresada correctamente', mascota });
            }
        } catch (error) {
            response.status(500).send({ error: error.message });
        }

    }

    public async obtenerMascotas({ response }: HttpContextContract) {
        try {
            const mascotas = await Mascota.all();
            response.status(200).send({ mascotas });
        } catch (error) {
            response.status(500).send({ error: error.message });
        }
    }

    public async filtrar({ request, response }: HttpContextContract) {
        const filtro = request.qs();

        try {
            var filtroespecie : Mascota[] | null = null;
            var filtroedad : Mascota[] | null = null;  
            var resfiltro: {} = {};          
          
            if (filtro.especie && !isNaN(filtro.especie)) {
                filtroespecie = await Mascota.query()
                    .where('especie', filtro.especie).exec();
                resfiltro['especie'] = filtroespecie;
            }
            if (filtro.edad && !isNaN(filtro.edad)) {
                filtroedad = await Mascota.query()
                    .where('edad', '<=', filtro.edad);
                resfiltro['edad'] = filtroedad;
            }

            response.status(200).send(resfiltro);
        } catch (error) {
            response.status(500).send({ error: error.message });
        }
    }

    public async actualizarMascota({ request, response }: HttpContextContract) {
        const { nombre_animal, especie, raza, genero, edad } = request.only(['codigo_animal', 'nombre_animal', 'especie', 'raza', 'genero', 'edad']);
        const codigo_animal = request.param('id');
        if (isNaN(codigo_animal)) return response.status(400).send({ mensaje: 'El código de la mascota debe ser un número' });
        try {
            const mascota = await Mascota.findBy('codigo_animal', codigo_animal);
            if (mascota) {
                mascota.nombre_animal = nombre_animal;
                mascota.especie = especie;
                mascota.raza = raza;
                mascota.genero = genero;
                mascota.edad = edad;
                await mascota.save();
                response.status(200).send({ mensaje: 'Mascota actualizada correctamente', mascota });
            } else {
                response.status(400).send({ mensaje: 'La mascota no existe' });
            }
        } catch (error) {
            response.status(500).send({ error: error.message });
        }
    }

    public async eliminarMascota({ request, response }: HttpContextContract) {
        const codigo_animal = request.param('id');
        if (isNaN(codigo_animal)) return response.status(400).send({ mensaje: 'El código de la mascota debe ser un número' });
        try {
            const mascota = await Mascota.findBy('codigo_animal', codigo_animal);
            if (mascota) {
                await mascota.delete();
                response.status(200).send({ mensaje: 'Mascota eliminada correctamente' });
            } else {
                response.status(400).send({ mensaje: 'La mascota no existe' });
            }
        } catch (error) {
            response.status(500).send({ error: error.message });
        }
    }

}
