import express from 'express';
import supabase from '../src/supabaseClient.mjs';
// Asegúrate de que la ruta esté bien

const app = express();
const port = 5000;

app.get('/api/productos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*'); // Ajusta a tu tabla y columnas

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
