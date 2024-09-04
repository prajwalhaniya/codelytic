// @ts-nocheck
import { Project } from "ts-morph";
import express from "express";
import axios from "axios";

const project = new Project();
const sourceFile = project.addSourceFileAtPath("../src/sample.ts");
