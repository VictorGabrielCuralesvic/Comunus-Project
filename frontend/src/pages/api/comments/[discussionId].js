import axios from 'axios';

export default async (req, res) => {
  const { discussionId } = req.query;

  if (req.method === 'GET') {
    try {
      const response = await axios.get(`http://localhost:5000/comments/${discussionId}`);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar comentários' });
    }
  } else if (req.method === 'POST') {
    try {
      const response = await axios.post(`http://localhost:5000/comments/${discussionId}`, req.body);
      res.status(201).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao enviar comentário' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
};
