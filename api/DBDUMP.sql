--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: apinrise
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO apinrise;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: apinrise
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    auth0_id character varying(255),
    name character varying(255),
    number character varying(255),
    email character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO apinrise;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: apinrise
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO apinrise;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apinrise
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: apinrise
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: apinrise
--

COPY public."SequelizeMeta" (name) FROM stdin;
20201003215212-create-user.js
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: apinrise
--

COPY public."Users" (id, auth0_id, name, number, email, "createdAt", "updatedAt") FROM stdin;
30	google-oauth2|109217450931934267738	Ryan Buckley	438-408-6340	ryanbuckley@gmail.com	2020-10-04 13:00:05.241-04	2020-10-04 15:23:32.22-04
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apinrise
--

SELECT pg_catalog.setval('public."Users_id_seq"', 30, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: apinrise
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: apinrise
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

