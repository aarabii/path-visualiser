"use client";

import React from "react";
import { algoDetails } from "../utils/algo-details";

type Props = {
  algorithm: string;
};

export default function AlgoDetails({ algorithm }: Props) {
  const info = algoDetails[algorithm] || {
    title: algorithm,
    short: "",
    example: "",
  };

  return (
    <section className="max-w-3xl mx-auto mt-8 rounded-xl border border-gray-700/60 bg-gray-800/40 backdrop-blur-sm p-6 shadow-[0_0_25px_rgba(0,0,0,0.25)] transition-all">
      <h2 className="text-3xl font-semibold tracking-tight text-gray-100 mb-4">
        {info.title}
      </h2>

      <p className="text-gray-300 leading-relaxed mb-6">{info.short}</p>

      <div className="rounded-lg border border-gray-700/50 bg-gray-900/30 p-5">
        <span className="text-sm uppercase tracking-wide text-gray-400 font-medium">
          Example
        </span>
        <p className="text-gray-200 mt-2 leading-relaxed">{info.example}</p>
      </div>
    </section>
  );
}
