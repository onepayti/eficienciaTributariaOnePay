import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";

export function App() {
  const [faturamento, setFaturamento] = useState<number>();
  const [faturamentoCartao, setFaturamentoCartao] = useState<number>();
  const [custos, setCustos] = useState<number[]>([0]);

  const [titulo, setTitulo] = useState();
  const [valor, setValor] = useState();
  function addCusto(e) {
    e.preventDefault();
    setCustos([10]);
    // setCustos({ titulo: titulo, valor: valor });
  }
  const impostoBruto = faturamento && faturamento * 0.205;
  return (
    <>
      <div className="bg-slate-900 w-full h-screen p-5 ">
        <h1 className="text-amber-50 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ">
          Simulador de eficiência tributária
        </h1>
        <div className="justify-center mt-20 flex gap-10">
          <div className="">
            <Card className=" w-xl grid place-content-between gap-10  ">
              <CardHeader>
                <CardTitle>Cenário 1: vendas em cartão!!</CardTitle>
                <CardAction>SEM EFICIÊNCIA TRIBUTÁRIA</CardAction>
              </CardHeader>
              <CardContent className="">
                <div className="flex  gap-10 mb-5 place-items-center">
                  <p>Faturamento mensal declarado:</p>
                  <input
                    placeholder="Digite Aqui"
                    value={faturamento}
                    onChange={(e) => setFaturamento(Number(e.target.value))}
                  ></input>
                </div>
                <div className="flex gap-14 mb-5 place-items-center">
                  <p>Alíquota do Simples Nacional:</p>
                  <span>20,5%</span>
                </div>
                <div className="flex gap-10 mb-5">
                  <p>Faturamento mensal em cartão:</p>
                  <input
                    placeholder="Digite Aqui"
                    value={faturamentoCartao}
                    onChange={(e) =>
                      setFaturamentoCartao(Number(e.target.value))
                    }
                  ></input>
                </div>

                <div className="flex  gap-10 mt-10 ">
                  <p> Insira abaixo os seus custos (Demais recebedores)</p>
                </div>

                <div>
                  <div className="flex place-content-between gap-4">
                    <input
                      placeholder="Digite Aqui"
                      name="texto"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                    ></input>
                    <input
                      placeholder="Digite Aqui"
                      name="custo"
                      value={valor}
                      onChange={(e) => setValor(e.target.value)}
                    ></input>
                    <Button type="button" onClick={(e) => addCusto(e)}>
                      +
                    </Button>
                  </div>
                </div>

                {custos.map((e, i) => {
                  return (
                    <div key={i}>
                      <div className="flex place-content-between gap-4">
                        <p>hello</p>
                        {/* <p>{e.titulo}</p>
                        <span>{e.valor}</span> */}
                      </div>
                    </div>
                  );
                })}

                <div>
                  <div className="flex place-content-between gap-4">
                    <p>Taxas da maquininha em cartão:</p>
                    <span>10%</span>
                  </div>

                  <div className="flex place-content-between gap-4">
                    <p>Imposto Bruto (Simples Nacional) - sem deduções:</p>
                    <span>{impostoBruto}</span>
                  </div>
                </div>

                <div className="flex place-content-between gap-4">
                  <strong>Margem de contribuição (lucro):</strong>
                  <span> R$ 19.500</span>
                </div>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
          <div className="">
            <Card className="w-2xl  ">
              <CardHeader>
                <CardTitle>Cenário 1: vendas em cartão!!</CardTitle>
                <CardAction>COM EFICIÊNCIA TRIBUTÁRIA</CardAction>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
