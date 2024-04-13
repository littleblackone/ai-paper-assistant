'use client';
import Header from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCopy } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';

const BtnList = [
  {
    label: '毕业论文',
    icon: '/btn/毕业论文.png'
  },
  {
    label: '演讲稿',
    icon: '/btn/演讲稿.png'
  },

  {
    label: '调研报告',
    icon: '/btn/调研报告.png'
  },
  {
    label: '实践报告',
    icon: '/btn/实践报告.png'
  },

  {
    label: '新闻稿',
    icon: '/btn/新闻稿.png'
  },
  {
    label: '剧本',
    icon: '/btn/剧本.png'
  },
  {
    label: '问卷设计',
    icon: '/btn/问卷设计.png'
  },
  {
    label: '思想汇报',
    icon: '/btn/思想汇报.png'
  },
  {
    label: '读后感',
    icon: '/btn/读后感.png'
  },
  {
    label: '流程文档',
    icon: '/btn/流程文档.png'
  },
  {
    label: '口播脚本',
    icon: '/btn/口播脚本.png'
  },
  {
    label: '毕业设计',
    icon: '/btn/毕业设计.png'
  }
];

const handleCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('大纲已复制');
  } catch (error) {}
};

export default function Home() {
  const [activeBtnIndex, setActiveBtnIndex] = useState(0);
  const [paperType, setPaperType] = useState('毕业论文');

  const [title, setTitle] = useState('');
  const [major, setMajor] = useState('');
  const [academic, setAcademic] = useState('本科');
  const [word, setWord] = useState('10000');

  const [result, setResult] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [isDisable, setIsDisable] = useState(false);

  const handleBtnClick = (index: number, type: string) => {
    setActiveBtnIndex(index);
    setPaperType(type);
  };

  const handlePaperGenerate = async () => {
    const prompt = `帮我写一篇千字左右的大纲符合我的情况和要求，类型是${paperType},题目是${title},我的专业是${major},我的学历是${academic},论文的字数大概是${word}}`;
    setIsLoading(true);
    const response = await axios.post('/api/kimi', { prompt });
    setIsLoading(false);
    setResult(response.data.choices[0].message.content);
  };

  useEffect(() => {
    if (
      paperType.length === 0 ||
      title.length === 0 ||
      academic.length === 0 ||
      word.length === 0 ||
      major.length === 0
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [paperType, title, major, academic, word, major]);

  return (
    <main className="flex h-full w-full flex-col items-center justify-between p-24">
      <Header></Header>
      <div className=" flex max-w-7xl flex-col gap-8">
        <div className="text-center">
          <h1 className=" text-bg text-6xl font-bold leading-[5rem] ">
            AI论文写作专业版
          </h1>
          <h1 className=" mt-4 text-lg font-semibold leading-[3rem]">
            毕业论文、课题论文、千字大纲免费生成, 几万字专业初稿！
          </h1>
          <h1 className=" text-3xl font-semibold leading-[3rem] ">
            搞定论文, 只需<span className=" text-green-400">3步</span>:
          </h1>
          <h1 className=" mt-4 text-lg font-semibold leading-[3rem] text-green-400">
            输入论文题目，生成千字大纲
          </h1>
          <Card className=" h-full max-w-[58rem] items-center justify-center">
            <CardContent className=" flex w-full flex-col items-center justify-between">
              <div className=" flex flex-wrap items-center justify-center gap-4 p-4">
                {BtnList.map((btn, index) => (
                  <Button
                    onClick={() => handleBtnClick(index, btn.label)}
                    className={`${
                      index === activeBtnIndex ? 'bg-blue-400 text-white' : ''
                    } flex min-w-[126px] items-center justify-start gap-2`}
                    key={index}
                  >
                    <Image
                      src={btn.icon}
                      alt={btn.label}
                      height={30}
                      width={30}
                    ></Image>
                    {btn.label}
                  </Button>
                ))}
              </div>
              <div className=" my-8 flex w-full items-center gap-4">
                <div className=" h-px w-full bg-zinc-300"></div>
                <div className=" w-fit text-nowrap">继续完善以下信息</div>
                <div className=" h-px w-full bg-zinc-300"></div>
              </div>
              <div className=" flex w-full flex-wrap items-center justify-center gap-4 lg:justify-between">
                <div className=" flex items-center gap-2">
                  <span className=" text-nowrap">标题:</span>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-[350px] ring-1 ring-blue-400 focus:border-none focus-visible:outline-none"
                    placeholder="请输入完整论文标题(5-50字或20个单词以内)"
                  ></Input>
                </div>
                <div className=" flex items-center gap-2">
                  <span className=" text-nowrap">专业:</span>
                  <Select value={major} onValueChange={(m) => setMajor(m)}>
                    <SelectTrigger className="w-[350px] ring-1 ring-blue-400">
                      <SelectValue placeholder="请选择专业" />
                    </SelectTrigger>
                    <SelectContent className=" bg-white">
                      <SelectGroup>
                        <SelectItem className="" value="计算机科学与技术">
                          计算机科学与技术
                        </SelectItem>
                        <SelectItem className="" value="软件工程">
                          软件工程
                        </SelectItem>
                        <SelectItem className="" value="法律">
                          法律
                        </SelectItem>
                        <SelectItem className="" value="电气工程">
                          电气工程
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <span className=" text-nowrap">学历:</span>
                  <Tabs
                    value={academic}
                    onValueChange={(a) => setAcademic(a)}
                    defaultValue="本科"
                    className="w-[350px] rounded-md bg-zinc-200"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="大专">大专</TabsTrigger>
                      <TabsTrigger value="本科">本科</TabsTrigger>
                      <TabsTrigger value="研究生">研究生</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="flex items-center gap-2">
                  <span className=" text-nowrap">字数:</span>
                  <Tabs
                    value={word}
                    onValueChange={(w) => setWord(w)}
                    defaultValue="10000"
                    className="w-[350px] rounded-md bg-zinc-200"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="10000">10000</TabsTrigger>
                      <TabsTrigger value="20000">20000</TabsTrigger>
                      <TabsTrigger value="30000">30000</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              <Button
                disabled={isLoading || isDisable}
                onClick={() => handlePaperGenerate()}
                className=" mt-8 flex min-w-[350px] items-center justify-center gap-2 rounded-full bg-blue-400 text-white"
              >
                <FiLoader
                  className={`hidden text-[1rem] ${isLoading && '!block animate-spin'}`}
                ></FiLoader>
                生成
              </Button>
              <span className=" mt-8 self-start text-lg font-bold">
                论文大纲:
              </span>
              <div className=" relative mt-2 w-full shadow-md">
                <pre className=" my-8 h-full min-h-[800px] w-full overflow-y-scroll text-wrap">
                  {result}
                </pre>
                <FaCopy
                  onClick={() => {
                    handleCopy(result);
                  }}
                  className="absolute right-[0.2rem] top-2 cursor-pointer text-[1.5rem]"
                ></FaCopy>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
