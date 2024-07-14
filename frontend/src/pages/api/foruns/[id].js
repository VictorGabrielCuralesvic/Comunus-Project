import axios from 'axios';

export default async (req, res) => {
  const { id } = req.query;

  try {
    const response = await axios.get(`http://localhost:5000/foruns/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar fórum' });
  }
};
