const fs = require('fs').promises;
const path = require('path');

async function generatePost(options) {
  const { title, description, tags, content, filename } = options;

  // Garante que a pasta pages/posts/ exista
  const postsDir = path.join(process.cwd(), 'pages', 'posts');
  await fs.mkdir(postsDir, { recursive: true });

  // Define o nome do arquivo com slug baseado no título
  const slug = filename || title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
  const filePath = path.join(postsDir, `${slug}.mdx`);

  // Template do arquivo .mdx com frontmatter e conteúdo
  const mdxContent = `---
type: posts
title: ${title}
description: ${description || 'Sem descrição'}
date: ${new Date().toISOString().split('T')[0]}
tags: [${tags ? tags.join(', ') : 'geral'}]
---

# ${title}

${content || 'Conteúdo do post ainda não definido. Edite este arquivo para adicionar mais detalhes!'}

## Introdução
Este é um post gerado automaticamente. Adicione seções, parágrafos ou código conforme necessário.

## Exemplo de Código
\`\`\`javascript
function helloWorld() {
  console.log("Olá, mundo!");
}
\`\`\`
`;

  // Escreve o arquivo e adiciona log para depuração
  try {
    await fs.writeFile(filePath, mdxContent, 'utf8');
    console.log(`Post gerado com sucesso em ${filePath}`);
  } catch (error) {
    console.error(`Erro ao gerar o post em ${filePath}:`, error.message);
  }
}

// Função para processar múltiplos posts a partir de um arquivo JSON (opcional)
async function generatePostsFromJson(jsonFilePath) {
  try {
    const postData = require(path.resolve(jsonFilePath));
    for (const post of postData) {
      await generatePost({
        title: post.title,
        description: post.description,
        tags: post.tags || ['geral'],
        content: post.content || ''
      });
    }
  } catch (err) {
    console.error(`Erro ao processar ${jsonFilePath}:`, err.message);
  }
}

// Executa o script com opções via linha de comando ou JSON
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Uso: yarn generate-post "Título do Post" [tags=tag1,tag2] [descricao="Descrição"] [conteudo="Conteúdo"] [arquivo=nome-do-arquivo] [json=caminho/para/post-data.json]');
  process.exit(1);
}

if (args[0].startsWith('json=')) {
  const jsonFilePath = args[0].split('json=')[1];
  generatePostsFromJson(jsonFilePath).catch(err => console.error(err));
} else {
  const title = args[0];
  const tags = (args.find(arg => arg.startsWith('tags='))?.split('tags=')[1] || 'geral').split(',');
  const description = args.find(arg => arg.startsWith('descricao='))?.split('descricao=')[1];
  const filename = args.find(arg => arg.startsWith('arquivo='))?.split('arquivo=')[1];
  const content = args.find(arg => arg.startsWith('conteudo='))?.split('conteudo=')[1];

  generatePost({ title, tags, description, filename, content }).catch(err => console.error(err));
}