import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Logo from "./assets/Logoredonda.png";
import LogoShield from "./assets/LogoredondaShield.png";
interface CustoType {
  titulo: string | undefined;
  valor: number | null;
}

export function App() {
  const [faturamentoMensal = 0, setFaturamentoMensal] = useState<number>();

  const [faturamentoCartao = 0, setFaturamentoCartao] = useState<number>();

  const [custos, setCustos] = useState<CustoType[]>([
    {
      titulo: "",
      valor: null,
    },
  ]);

  const [titulo, setTitulo] = useState<string>();
  const [valor = 0, setValor] = useState<number | undefined>(undefined);

  const [taxaPos = 0, setTaxaPos] = useState<number>();
  const [taxaPosShield = 0, setTaxaPosShield] = useState<number>();

  const [segmento, setSegmento] = useState<string>();

  const [aliquotaNacional = 0, setAliquotaNacional] = useState<number>();
  const [aliquotaNacionalShield = 0, setAliquotaNacionalShield] =
    useState<number>();

  function addCusto(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log(event);
    event.preventDefault();
    setCustos([...custos, { titulo: titulo, valor: Number(valor) }]);

    setTitulo("");
    setValor(undefined);
  }

  function percentFormmat(t: number) {
    const valor = new Intl.NumberFormat("pt-br", {
      style: "percent",
      maximumFractionDigits: 2,
    }).format(t / 100);

    return valor;
  }

  function formattedNumber(value: number) {
    const valor = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(value);

    return valor;
  }
  const impostoBruto =
    faturamentoMensal && faturamentoMensal * (aliquotaNacional / 100);

  const custosTotais = custos.reduce(
    (acc, currentValue) => acc + (currentValue.valor ?? 0),
    0
  );
  const faturamentoWithShield = faturamentoMensal - custosTotais;

  const impostoBruto2 =
    faturamentoWithShield &&
    faturamentoWithShield * (aliquotaNacionalShield / 100);

  const lucroSemEficiencia =
    faturamentoMensal -
    custosTotais -
    impostoBruto -
    faturamentoCartao * (Number(taxaPos) / 100);

  const lucroComEficiencia =
    faturamentoWithShield -
    impostoBruto2 -
    faturamentoCartao * (Number(taxaPosShield) / 100);
  const lucroPercent =
    ((lucroComEficiencia - lucroSemEficiencia) / lucroSemEficiencia) * 100;

  let fee = 0;
  useEffect(() => {
    switch (segmento) {
      case "Comércio":
        if (faturamentoMensal * 12 >= 3600000) {
          fee = 19;
        }
        if (
          faturamentoMensal * 12 >= 1800000 &&
          faturamentoMensal * 12 < 3600000
        ) {
          fee = 14.3;
        }
        if (
          faturamentoMensal * 12 >= 720000 &&
          faturamentoMensal * 12 < 1800000
        ) {
          fee = 10.7;
        }
        if (
          faturamentoMensal * 12 >= 360000 &&
          faturamentoMensal * 12 < 720000
        ) {
          fee = 9.5;
        }
        if (
          faturamentoMensal * 12 >= 180000 &&
          faturamentoMensal * 12 < 360000
        ) {
          fee = 7.3;
        }
        if (faturamentoMensal * 12 >= 0 && faturamentoMensal * 12 < 180000) {
          fee = 4;
        }
        return setAliquotaNacional(fee);
      case "Indústria":
        if (faturamentoMensal * 12 >= 3600000) {
          fee = 30;
        }
        if (
          faturamentoMensal * 12 >= 1800000 &&
          faturamentoMensal * 12 < 3600000
        ) {
          fee = 14.7;
        }
        if (
          faturamentoMensal * 12 >= 720000 &&
          faturamentoMensal * 12 < 1800000
        ) {
          fee = 11.2;
        }
        if (
          faturamentoMensal * 12 >= 360000 &&
          faturamentoMensal * 12 < 720000
        ) {
          fee = 10;
        }
        if (
          faturamentoMensal * 12 >= 180000 &&
          faturamentoMensal * 12 < 360000
        ) {
          fee = 7.8;
        }
        if (faturamentoMensal * 12 >= 0 && faturamentoMensal * 12 < 180000) {
          fee = 4.5;
        }
        return setAliquotaNacional(fee);

      case "Serviços I":
        if (faturamentoMensal * 12 >= 3600000) {
          fee = 33;
        }
        if (
          faturamentoMensal * 12 >= 1800000 &&
          faturamentoMensal * 12 < 3600000
        ) {
          fee = 21;
        }
        if (
          faturamentoMensal * 12 >= 720000 &&
          faturamentoMensal * 12 < 1800000
        ) {
          fee = 16;
        }
        if (
          faturamentoMensal * 12 >= 360000 &&
          faturamentoMensal * 12 < 720000
        ) {
          fee = 13.5;
        }
        if (
          faturamentoMensal * 12 >= 180000 &&
          faturamentoMensal * 12 < 360000
        ) {
          fee = 11.2;
        }
        if (faturamentoMensal * 12 >= 0 && faturamentoMensal * 12 < 180000) {
          fee = 6;
        }
        return setAliquotaNacional(fee);

      case "Serviços II":
        if (faturamentoMensal * 12 >= 3600000) {
          fee = 33;
        }
        if (
          faturamentoMensal * 12 >= 1800000 &&
          faturamentoMensal * 12 < 3600000
        ) {
          fee = 22;
        }
        if (
          faturamentoMensal * 12 >= 720000 &&
          faturamentoMensal * 12 < 1800000
        ) {
          fee = 14;
        }
        if (
          faturamentoMensal * 12 >= 360000 &&
          faturamentoMensal * 12 < 720000
        ) {
          fee = 10.2;
        }
        if (
          faturamentoMensal * 12 >= 180000 &&
          faturamentoMensal * 12 < 360000
        ) {
          fee = 9;
        }
        if (faturamentoMensal * 12 >= 0 && faturamentoMensal * 12 < 180000) {
          fee = 4.5;
        }
        return setAliquotaNacional(fee);

      case "Serviços III":
        if (faturamentoMensal * 12 >= 3600000) {
          fee = 30.5;
        }
        if (
          faturamentoMensal * 12 >= 1800000 &&
          faturamentoMensal * 12 < 3600000
        ) {
          fee = 23;
        }
        if (
          faturamentoMensal * 12 >= 720000 &&
          faturamentoMensal * 12 < 1800000
        ) {
          fee = 20.5;
        }
        if (
          faturamentoMensal * 12 >= 360000 &&
          faturamentoMensal * 12 < 720000
        ) {
          fee = 19.5;
        }
        if (
          faturamentoMensal * 12 >= 180000 &&
          faturamentoMensal * 12 < 360000
        ) {
          fee = 18;
        }
        if (faturamentoMensal * 12 >= 0 && faturamentoMensal * 12 < 180000) {
          fee = 15.5;
        }
        return setAliquotaNacional(fee);

      default:
        console.log("error");
        break;
    }
  }, [faturamentoMensal, segmento]);

  useEffect(() => {
    switch (segmento) {
      case "Comércio":
        if (faturamentoWithShield * 12 >= 3600000) {
          fee = 19;
        }
        if (
          faturamentoWithShield * 12 >= 1800000 &&
          faturamentoWithShield * 12 < 3600000
        ) {
          fee = 14.3;
        }
        if (
          faturamentoWithShield * 12 >= 720000 &&
          faturamentoWithShield * 12 < 1800000
        ) {
          fee = 10.7;
        }
        if (
          faturamentoWithShield * 12 >= 360000 &&
          faturamentoWithShield * 12 < 720000
        ) {
          fee = 9.5;
        }
        if (
          faturamentoWithShield * 12 >= 180000 &&
          faturamentoWithShield * 12 < 360000
        ) {
          fee = 7.3;
        }
        if (
          faturamentoWithShield * 12 >= 0 &&
          faturamentoWithShield * 12 < 180000
        ) {
          fee = 4;
        }
        return setAliquotaNacionalShield(fee);
      case "Indústria":
        if (faturamentoWithShield * 12 >= 3600000) {
          fee = 30;
        }
        if (
          faturamentoWithShield * 12 >= 1800000 &&
          faturamentoWithShield * 12 < 3600000
        ) {
          fee = 14.7;
        }
        if (
          faturamentoWithShield * 12 >= 720000 &&
          faturamentoWithShield * 12 < 1800000
        ) {
          fee = 11.2;
        }
        if (
          faturamentoWithShield * 12 >= 360000 &&
          faturamentoWithShield * 12 < 720000
        ) {
          fee = 10;
        }
        if (
          faturamentoWithShield * 12 >= 180000 &&
          faturamentoWithShield * 12 < 360000
        ) {
          fee = 7.8;
        }
        if (
          faturamentoWithShield * 12 >= 0 &&
          faturamentoWithShield * 12 < 180000
        ) {
          fee = 4.5;
        }
        return setAliquotaNacionalShield(fee);

      case "Serviços I":
        if (faturamentoWithShield * 12 >= 3600000) {
          fee = 33;
        }
        if (
          faturamentoWithShield * 12 >= 1800000 &&
          faturamentoWithShield * 12 < 3600000
        ) {
          fee = 21;
        }
        if (
          faturamentoWithShield * 12 >= 720000 &&
          faturamentoWithShield * 12 < 1800000
        ) {
          fee = 16;
        }
        if (
          faturamentoWithShield * 12 >= 360000 &&
          faturamentoWithShield * 12 < 720000
        ) {
          fee = 13.5;
        }
        if (
          faturamentoWithShield * 12 >= 180000 &&
          faturamentoWithShield * 12 < 360000
        ) {
          fee = 11.2;
        }
        if (
          faturamentoWithShield * 12 >= 0 &&
          faturamentoWithShield * 12 < 180000
        ) {
          fee = 6;
        }
        return setAliquotaNacionalShield(fee);

      case "Serviços II":
        if (faturamentoWithShield * 12 >= 3600000) {
          fee = 33;
        }
        if (
          faturamentoWithShield * 12 >= 1800000 &&
          faturamentoWithShield * 12 < 3600000
        ) {
          fee = 22;
        }
        if (
          faturamentoWithShield * 12 >= 720000 &&
          faturamentoWithShield * 12 < 1800000
        ) {
          fee = 14;
        }
        if (
          faturamentoWithShield * 12 >= 360000 &&
          faturamentoWithShield * 12 < 720000
        ) {
          fee = 10.2;
        }
        if (
          faturamentoWithShield * 12 >= 180000 &&
          faturamentoWithShield * 12 < 360000
        ) {
          fee = 9;
        }
        if (
          faturamentoWithShield * 12 >= 0 &&
          faturamentoWithShield * 12 < 180000
        ) {
          fee = 4.5;
        }
        return setAliquotaNacionalShield(fee);

      case "Serviços III":
        if (faturamentoWithShield * 12 >= 3600000) {
          fee = 30.5;
        }
        if (
          faturamentoWithShield * 12 >= 1800000 &&
          faturamentoWithShield * 12 < 3600000
        ) {
          fee = 23;
        }
        if (
          faturamentoWithShield * 12 >= 720000 &&
          faturamentoWithShield * 12 < 1800000
        ) {
          fee = 20.5;
        }
        if (
          faturamentoWithShield * 12 >= 360000 &&
          faturamentoWithShield * 12 < 720000
        ) {
          fee = 19.5;
        }
        if (
          faturamentoWithShield * 12 >= 180000 &&
          faturamentoWithShield * 12 < 360000
        ) {
          fee = 18;
        }
        if (
          faturamentoWithShield * 12 >= 0 &&
          faturamentoWithShield * 12 < 180000
        ) {
          fee = 15.5;
        }
        return setAliquotaNacionalShield(fee);

      default:
        console.log("error");
        break;
    }
  }, [faturamentoWithShield, segmento]);
  return (
    <>
      <div className="">
        <div className="flex border-0 bg-slate-900 pl-20   max-sm:justify-center max-sm:pl-0">
          <img className="w-50 max-sm:w-30  " src={LogoShield}></img>
        </div>
        <div className="w-full mt-[-6rem] max-sm:mt-0 bg-slate-900 min-h-screen p-5 grid place-content-center max-sm:max-w-full ">
          <h1 className="text-amber-50 text-center scroll-m-20  pb-2 text-3xl max-sm:text-2xl font-semibold tracking-tight  ">
            INTELIGÊNCIA TRIBUTARIA SHIELD
          </h1>
          <div className=" xl:grid xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-1  ">
            <div className="w-full mt-10 mb-10 grid place-content-center ">
              <div className="flex gap-3">
                <h1 className=" text-amber-50 max-sm:text-[0.9rem]">
                  Empreendedor MEI:{" "}
                </h1>

                <select className="text-neutral-400 " name="select">
                  <option value="sim"> Sim</option>
                  <option value="nao" selected>
                    {" "}
                    Não
                  </option>
                </select>
              </div>
              <div className="flex gap-3">
                <h1 className=" text-amber-50 max-sm:text-[0.9rem]">
                  Anexo do Simples Nacional:
                </h1>
                <select
                  className=" max-w-30 bg-amber-50  focus:text-black   rounded-md "
                  name="select"
                  onChange={(e) => setSegmento(e.target.value)}
                >
                  <option value={""}></option>
                  <option value="Comércio"> Anexo 1</option>
                  <option value="Indústria"> Anexo 2</option>
                  <option value="Serviços I"> Anexo 3</option>
                  <option value="Serviços II"> Anexo 4</option>
                  <option value="Serviços III"> Anexo 5</option>
                </select>
              </div>
            </div>
          </div>
          <div className=" max-sm:mt-6  gap-10 grid sm:grid-cols-2   ">
            <div className=" w-full ">
              <Card className=" grid place-content-between gap-10 max-sm:text-[0.85rem]  max-md:text-[0.85rem]  ">
                <CardHeader>
                  {/* <CardTitle>Cenário 1: vendas em cartão!!</CardTitle> */}
                  <CardAction>SEM EFICIÊNCIA TRIBUTÁRIA</CardAction>
                </CardHeader>
                <CardContent className="">
                  <div className="flex mb-5 justify-between items-center  gap-2 max-sm:text-[0.85rem]  ">
                    <p>Faturamento mensal declarado:</p>
                    <Input
                      className="max-w-30 bg-blue-950 text-amber-50 max-sm:text-[0.85rem]"
                      placeholder="Digite Aqui"
                      type="text"
                      value={formattedNumber(faturamentoMensal)}
                      onChange={(e) => {
                        const numericValue =
                          Number(e.target.value.replace(/\D/g, "")) / 100;

                        setFaturamentoMensal(numericValue);
                      }}
                    ></Input>
                  </div>
                  <div className="flex gap-14 mb-5  ">
                    <p>Alíquota do Simples Nacional:</p>
                    <span className="grid place-items-center">
                      {percentFormmat(aliquotaNacional)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-5 mb-5">
                    <p>Faturamento mensal cartão:</p>
                    <Input
                      className="max-w-30 bg-blue-950 text-amber-50 max-sm:text-[0.85rem]"
                      placeholder="Digite Aqui "
                      value={formattedNumber(faturamentoCartao)}
                      onChange={(e) => {
                        const numericValue =
                          Number(e.target.value.replace(/\D/g, "")) / 100;

                        setFaturamentoCartao(numericValue);
                      }}
                    ></Input>
                  </div>

                  <div className="flex  gap-10 mt-10 ">
                    <p> Insira abaixo os seus custos (Demais recebedores)</p>
                    <span>
                      {custosTotais >= 0 ? formattedNumber(custosTotais) : 0}{" "}
                    </span>
                  </div>

                  <div>
                    <div className="flex place-content-between gap-4 place-items-center mt-4 ">
                      <Input
                        className=" bg-blue-950 text-amber-50 placeholder:text-amber-50 max-sm:text-[0.85rem]"
                        placeholder="Digite Aqui os recebedores"
                        name="texto"
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                      ></Input>
                      <Input
                        className=" bg-blue-950 text-amber-50 placeholder:text-amber-50 max-sm:text-[0.85rem]"
                        placeholder="Digite Aqui o valor"
                        name="custo"
                        type="text"
                        value={formattedNumber(valor)}
                        onChange={(e) => {
                          const numericValue =
                            Number(e.target.value.replace(/\D/g, "")) / 100;

                          setValor(numericValue);
                        }}
                      ></Input>
                      <Button
                        className="w-0 h-7 bg-blue-950"
                        type="button"
                        onClick={(event) => addCusto(event)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {custos &&
                    custos.map((e, i) => {
                      return (
                        <div key={i}>
                          <div className="flex items-center gap-6 mt-2 ">
                            <p className="flex ">
                              {e.titulo && `Devo pagar para: ${e.titulo}`}
                            </p>
                            <span className="  ">
                              {e.valor && formattedNumber(e.valor)}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                  <div>
                    <div className="flex place-content-between mt-10 mb-4">
                      <p>Taxas da maquininha em cartão:</p>
                      <Input
                        className="max-w-20 bg-blue-950 text-amber-50 placeholder:text-amber-50 max-sm:text-[0.85rem]"
                        placeholder="Digita Aqui"
                        type=""
                        value={taxaPos}
                        onBlur={(e) => (e.target.value = taxaPos + "%")}
                        onChange={(e) => {
                          const numericValue = Number(
                            e.target.value.replace(/[^a-zA-Z0-9\s]/g, "")
                          );
                          setTaxaPos(numericValue);
                        }}
                      ></Input>
                    </div>

                    <div className="flex place-content-between gap-4 mt-10">
                      <p>Imposto Bruto (Simples Nacional):</p>
                      <span>{formattedNumber(impostoBruto)}</span>
                    </div>
                  </div>

                  <div className="flex place-content-between gap-4 mt-2">
                    <strong>Margem de contribuição (lucro):</strong>
                    <span>{formattedNumber(lucroSemEficiencia)}</span>
                  </div>
                </CardContent>
                <CardFooter className="w-full grid place-content-center">
                  <img className="w-40" src={Logo} />
                </CardFooter>
              </Card>
            </div>
            <div className="w-full">
              <Card className=" grid place-content-between gap-10  max-sm:text-[0.85rem]  ">
                <CardHeader>
                  {/* <CardTitle>Cenário 1: vendas em cartão!!</CardTitle> */}
                  <CardAction className="w-70 max-sm:w-55 h-10 flex justify-center items-center rounded-2xl bg-blue-950 text-amber-50">
                    COM EFICIÊNCIA TRIBUTÁRIA
                  </CardAction>
                </CardHeader>
                <CardContent className="">
                  <div className="flex gap-10 mb-5 place-items-center">
                    <p>Faturamento mensal declarado:</p>
                    <span>{formattedNumber(faturamentoWithShield)}</span>
                  </div>
                  <div className="flex gap-14 mb-5 place-items-center">
                    <p>Alíquota do Simples Nacional:</p>
                    <span>{percentFormmat(aliquotaNacionalShield)}</span>
                  </div>
                  <div className="flex gap-10 mb-5">
                    <p>Faturamento mensal em cartão:</p>
                    <span>{formattedNumber(faturamentoCartao)}</span>
                  </div>

                  <div className="flex  gap-10 mt-10 ">
                    <p> Insira abaixo os seus custos (Demais recebedores)</p>
                    <span>
                      {custosTotais >= 0 ? formattedNumber(custosTotais) : 0}{" "}
                    </span>
                  </div>
                  {custos &&
                    custos.map((e, i) => {
                      return (
                        <div key={i}>
                          <div className="flex place-content-between gap-4">
                            <p>{e.titulo}</p>
                            <span>{e.valor && formattedNumber(e.valor)}</span>
                          </div>
                        </div>
                      );
                    })}

                  <div>
                    <div className="flex place-content-between gap-4 mt-10 ">
                      <p>Taxas da maquininha em cartão:</p>
                      <Input
                        placeholder="Digita Aqui"
                        className="max-w-20 h-6"
                        value={taxaPosShield}
                        onBlur={(e) => (e.target.value = taxaPosShield + "%")}
                        onChange={(e) => {
                          console.log(e);
                          const numericValue = Number(
                            e.target.value.replace(/[^a-zA-Z0-9\s]/g, "")
                          );
                          setTaxaPosShield(numericValue);
                        }}
                      ></Input>
                    </div>

                    <div className="flex place-content-between gap-4 mt-10">
                      <p>Imposto Bruto (Simples Nacional):</p>
                      <span>{formattedNumber(impostoBruto2)}</span>
                    </div>
                  </div>

                  <div className="flex place-content-between gap-4 mt-2">
                    <strong>Margem de contribuição (lucro):</strong>
                    <span>{formattedNumber(lucroComEficiencia)}</span>
                  </div>
                </CardContent>
                <CardFooter className="w-full grid place-content-center place-items-center">
                  {lucroComEficiencia > 100 ? (
                    <div className="w-full grid place-content-center border-2 rounded-2xl max-sm:w-10  ">
                      <Card className="w-100 grid gap-5 bg-blue-950 text-amber-50 max-sm:w-80 ">
                        <CardHeader>
                          <CardTitle>ECONOMIA COM A SHIELD:</CardTitle>
                        </CardHeader>
                        <CardContent className="w-auto grid place-content-center  ">
                          <div className="flex justify-center gap-5 ">
                            <h1 className="text-[1rem] max-sm:text-[0.85rem]">
                              Aumento do lucro em:{" "}
                            </h1>
                            <strong className="text-[1.3rem] max-sm:text-[1.1rem]">
                              {percentFormmat(lucroPercent)}
                            </strong>
                          </div>

                          <div className="flex justify-center gap-5 ">
                            <h1 className="text-[1.0rem] max-sm:text-[0.85rem]">
                              Ganho em 12 meses:
                            </h1>
                            <strong className="text-xl text-center max-sm:text-[1.1rem]">
                              {formattedNumber(
                                12 * (lucroComEficiencia - lucroSemEficiencia)
                              )}
                            </strong>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : null}
                  <img className="w-40 " src={Logo} />
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
