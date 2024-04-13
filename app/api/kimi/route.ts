import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const url = 'https://api.moonshot.cn/v1/chat/completions';

const handleKimi = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const prompt = body.prompt;

    if (!body.prompt) {
      console.log('missing prompt');
      return NextResponse.json(
        { error: 'missing prompt' },
        {
          status: 400
        }
      );
    }

    const systemPrompt =
      '你是一名专业的论文助手，你会根据用户的要求撰写千字左右的论文大纲,只用回复论文大纲的内容。同时你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。';

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.KIMI_KEY}`
      },
      data: {
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          { role: 'user', content: prompt }
        ]
      },
      url,
      method: 'post'
    };

    const response = await axios(options);

    return NextResponse.json(response.data, {
      status: response.status
    });
  } catch (error) {
    console.error(`Error: ${error}`);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

export const POST = handleKimi;
