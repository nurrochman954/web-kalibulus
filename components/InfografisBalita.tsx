"use client";

import React, { useRef, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FaChild,
  FaVenusMars,
  FaExclamationTriangle,
  FaClock,
  FaWeight,
  FaRulerVertical,
  FaCircle,
  FaMale,
  FaFemale,
} from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface GrafikItem {
  bulan: string;
  bbLaki: number;
  bbPerempuan: number;
  tbLaki: number;
  tbPerempuan: number;
  lkLaki: number;
  lkPerempuan: number;
}

interface PeriodeRekap {
  periode: string;
  tahun: number;
}

interface RekapProps {
  totalBalita: number;
  jumlahLaki: number;
  jumlahPerempuan: number;
  rataUmur: number;
  umurLaki: number;
  umurPerempuan: number;
  rataBB: number;
  bbLaki: number;
  bbPerempuan: number;
  rataTB: number;
  tbLaki: number;
  tbPerempuan: number;
  rataLK: number;
  lkLaki: number;
  lkPerempuan: number;
  jumlahStunting: number;
  persenStunting: string;
  grafikBulanan: GrafikItem[];
  periodeRekap: PeriodeRekap[];
}

export default function InfografisBalita() {
  const [data, setData] = useState<RekapProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<"balita">("balita");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/rekap")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center p-4">Memuat data...</p>;
  if (!data)
    return <p className="text-center text-red-500">Gagal memuat data</p>;

  const periodeData = data.periodeRekap?.[0];
  const judul = periodeData
    ? `Rekap Data Balita Periode ${periodeData.periode} ${periodeData.tahun}`
    : "Rekap Data Balita ";

  const {
    totalBalita,
    jumlahLaki,
    jumlahPerempuan,
    rataUmur,
    umurLaki,
    umurPerempuan,
    rataBB,
    bbLaki,
    bbPerempuan,
    rataTB,
    tbLaki,
    tbPerempuan,
    rataLK,
    lkLaki,
    lkPerempuan,
    jumlahStunting,
    persenStunting,
    grafikBulanan,
  } = data;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-700 bg-clip-text text-transparent">
                  Infografis Posyandu
                </h1>
                <p className="text-gray-600 mt-1 text-sm md:text-base">
                  Dusun Kalibulus - Data {periodeData.periode}{" "}
                  {periodeData.tahun}
                </p>
              </div>
              <div className="text-center md:text-right">
                <div className="text-3xl md:text-4xl font-bold text-cyan-600">
                  {totalBalita}
                </div>
                <div className="text-sm text-gray-500">Anak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto scrollbar-hide">
              {[{ id: "balita", label: "Balita" }].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setSelectedView(view.id as any)}
                  className={`relative whitespace-nowrap py-4 px-4 md:px-6 font-medium text-sm transition-all duration-300 ${
                    selectedView === view.id
                      ? "text-cyan-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {view.label}
                  {selectedView === view.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 animate-slide-in-left" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contents */}
        {selectedView === "balita" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center ">
                <CardContent className="py-6 space-y-2">
                  <div className="text-5xl text-blue-600 flex justify-center">
                    <FaChild />
                  </div>
                  <p className="text-base text-gray-500 font-medium">
                    Total Balita Aktif
                  </p>
                  <h3 className="text-4xl font-extrabold text-blue-900">
                    {totalBalita}
                  </h3>
                  <p className="text-base font-medium text-gray-600">Jiwa</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="py-6 space-y-2 ">
                  <div className="text-5xl text-green-600 flex justify-center">
                    <FaVenusMars />
                  </div>
                  <p className="text-base font-medium text-gray-500">
                    Laki-laki & Perempuan
                  </p>
                  {/* Laki-laki */}
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <FaMale className="text-2xl" />
                    <span className="font-semibold text-xl">Laki-laki:</span>
                    <span className="text-xl">{jumlahLaki} anak</span>
                  </div>

                  {/* Perempuan */}
                  <div className="flex items-center justify-center gap-2 text-pink-600">
                    <FaFemale className="text-2xl" />
                    <span className="font-semibold text-xl">Perempuan:</span>
                    <span className="text-xl">{jumlahPerempuan} anak</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="py-4">
                  <p className=" text-gray-500 mb-2 font-medium">
                    Rata-rata Umur, Berat Badan, Tinggi Badan, Lingkar Kepala
                  </p>

                  <Tabs defaultValue="umur" className="w-full">
                    <TabsList className="grid grid-cols-[2fr_1fr_1fr_1fr] mb-2">
                      <TabsTrigger
                        value="umur"
                        className="flex items-center justify-center"
                      >
                        <FaClock className="w-4 h-4 mr-1 text-blue-600" />
                        Umur
                      </TabsTrigger>
                      <TabsTrigger
                        value="bb"
                        className="flex items-center justify-center"
                      >
                        <FaWeight className="w-4 h-4 mr-1 text-pink-600" /> BB
                      </TabsTrigger>
                      <TabsTrigger
                        value="tb"
                        className="flex items-center justify-center"
                      >
                        <FaRulerVertical className="w-4 h-4 mr-1 text-green-600" />{" "}
                        TB
                      </TabsTrigger>
                      <TabsTrigger
                        value="lk"
                        className="flex items-center justify-center"
                      >
                        <FaCircle className="w-4 h-4 mr-1 text-yellow-500" /> LK
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="umur">
                      <div className="space-y-1 text-2sm">
                        <p>
                          <b>Laki-laki:</b> {umurLaki.toFixed(0)} bulan
                        </p>
                        <p>
                          <b>Perempuan:</b> {umurPerempuan.toFixed(0)} bulan
                        </p>
                        <p>
                          <b>Total:</b> {rataUmur.toFixed(0)} bulan
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="bb">
                      <div className="space-y-1 text-2sm">
                        <p>
                          <b>Laki-laki:</b> {bbLaki.toFixed(1)} kg
                        </p>
                        <p>
                          <b>Perempuan:</b> {bbPerempuan.toFixed(1)} kg
                        </p>
                        <p>
                          <b>Total:</b> {rataBB.toFixed(1)} kg
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="tb">
                      <div className="space-y-1 text-2sm">
                        <p>
                          <b>Laki-laki:</b> {tbLaki.toFixed(1)} cm
                        </p>
                        <p>
                          <b>Perempuan:</b> {tbPerempuan.toFixed(1)} cm
                        </p>
                        <p>
                          <b>Total:</b> {rataTB.toFixed(1)} cm
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="lk">
                      <div className="space-y-1 text-2sm">
                        <p>
                          <b>Laki-laki:</b> {lkLaki.toFixed(1)} cm
                        </p>
                        <p>
                          <b>Perempuan:</b> {lkPerempuan.toFixed(1)} cm
                        </p>
                        <p>
                          <b>Total:</b> {rataLK.toFixed(1)} cm
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="py-6 space-y-2">
                  <div className="text-4xl text-yellow-400 flex justify-center">
                    <FaExclamationTriangle />
                  </div>
                  <p className="text-base text-gray-500 font-medium">
                    Indikasi Waspada Stunting
                  </p>
                  <h3 className="text-3xl font-extrabold text-red-600">
                    {jumlahStunting} anak
                  </h3>
                  <p className="text-base font-medium text-gray-700">
                    Persentase: {persenStunting}
                  </p>

                  <p className="text-xs text-gray-400 italic">
                    *Analisis ini hanya berdasarkan tinggi badan. Pemeriksaan
                    lanjutan tetap diperlukan.
                  </p>
                </CardContent>
              </Card>
            </div>
            <hr className="my-10 border-t-2 border-gray-300" />{" "}
            {/* Pembatas garis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
              <div className="text-center pt-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-blue-900">
                  Grafik Perkembangan Umum
                </h3>
                <p className="text-sm text-gray-600">
                  Data berat badan, tinggi badan, dan lingkar kepala tiap bulan
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="font-semibold text-center mb-2">
                    BB/TB/LK Laki-laki per Bulan
                  </h4>
                  <ChartGender gender="L" data={grafikBulanan} />
                </div>
                <div>
                  <h4 className="font-semibold text-center mb-2">
                    BB/TB/LK Perempuan per Bulan
                  </h4>
                  <ChartGender gender="P" data={grafikBulanan} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow text-sm">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => {
          let satuan = "";
          if (entry.name === "Berat Badan") satuan = "kg";
          if (entry.name === "Tinggi Badan") satuan = "cm";
          if (entry.name === "Lingkar Kepala") satuan = "cm";
          return (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} {satuan}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};

function ChartGender({
  data,
  gender,
}: {
  data: GrafikItem[];
  gender: "L" | "P";
}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="bulan" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey={gender === "L" ? "bbLaki" : "bbPerempuan"}
          stroke="#1d4ed8"
          name="Berat Badan"
        />
        <Line
          type="monotone"
          dataKey={gender === "L" ? "tbLaki" : "tbPerempuan"}
          stroke="#059669"
          name="Tinggi Badan"
        />
        <Line
          type="monotone"
          dataKey={gender === "L" ? "lkLaki" : "lkPerempuan"}
          stroke="#f59e0b"
          name="Lingkar Kepala"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
