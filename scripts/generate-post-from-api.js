require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

// Log para depuração do diretório de trabalho
console.log('Diretório de trabalho atual:', process.cwd());

async function generatePostFromApi() {
  const apiKey = process.env.API_KEY;
  const url = `https://newsapi.org/v2/everything?q=tecnologia+banco+de+dados+sql+python+análise+de+dados&language=pt&apiKey=${apiKey}&pageSize=5`;

  try {
    const response = await axios.get(url);
    const articles = response.data.articles;

    // Usa o diretório de trabalho atual como base e adiciona o caminho relativo
    const postsDir = path.join(process.cwd(), 'pages', 'posts');
    console.log('Diretório de posts definido:', postsDir); // Log para depuração
    await fs.mkdir(postsDir, { recursive: true });

    for (const article of articles) {
      const title = article.title.replace(/[^a-zA-Z0-9\s-]/g, '').trim();
      const slug = title.toLowerCase().replace(/\s+/g, '-');
      const filePath = path.join(postsDir, `${slug}.mdx`);

      const mdxContent = `---
title: ${title}
description: Ideia de post inspirada em uma notícia sobre ${article.source.name}
date: ${new Date().toISOString().split('T')[0]}
tags: [tecnologia, banco-de-dados, sql, python, analise-de-dados]
---

# ${title}

## Introdução
Este post foi gerado a partir de uma notícia recente da ${article.source.name}. A ideia é explorar o tema "${title}" com base no contexto do artigo.

## Sugestão de Conteúdo
- Resuma o artigo: ${article.description || 'Sem descrição disponível.'}
- Adicione uma análise pessoal ou tutorial relacionado (ex.: como isso impacta SQL, Python ou análise de dados).
- Inclua um exemplo prático ou código, se aplicável.

## Próximos Passos
Edite este arquivo para expandir o conteúdo com suas ideias ou experiências!

## Fonte
[Leia o artigo original](${article.url})
`;

      await fs.writeFile(filePath, mdxContent, 'utf8');
      console.log(`Post gerado em ${filePath}`);
    }
  } catch (error) {
    console.error('Erro ao buscar ou gerar posts:', error.message);
  }
}

generatePostFromApi().catch(err => console.error(err));