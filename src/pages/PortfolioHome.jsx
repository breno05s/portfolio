import './PortfolioHome.css'
import { useState, useEffect, useRef } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

import Header from '../components/PortfolioHeader'
import Footer from '../components/PortfolioFooter'
import Project from '../components/PortfolioProject'
import Modal from '../components/PortfolioModal'

import TodoList from '../assets/projects/todo-list.png'
import ControleFinanceiro from '../assets/projects/controle-financeiro.png'

function Home() {

    const socialMedia = [
        {
            img: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMCIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iMzJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTYuMDAzLDBDNy4xNywwLDAuMDA4LDcuMTYyLDAuMDA4LDE1Ljk5NyAgYzAsNy4wNjcsNC41ODIsMTMuMDYzLDEwLjk0LDE1LjE3OWMwLjgsMC4xNDYsMS4wNTItMC4zMjgsMS4wNTItMC43NTJjMC0wLjM4LDAuMDA4LTEuNDQyLDAtMi43NzcgIGMtNC40NDksMC45NjctNS4zNzEtMi4xMDctNS4zNzEtMi4xMDdjLTAuNzI3LTEuODQ4LTEuNzc1LTIuMzQtMS43NzUtMi4zNGMtMS40NTItMC45OTIsMC4xMDktMC45NzMsMC4xMDktMC45NzMgIGMxLjYwNSwwLjExMywyLjQ1MSwxLjY0OSwyLjQ1MSwxLjY0OWMxLjQyNywyLjQ0MywzLjc0MywxLjczNyw0LjY1NCwxLjMyOWMwLjE0Ni0xLjAzNCwwLjU2LTEuNzM5LDEuMDE3LTIuMTM5ICBjLTMuNTUyLTAuNDA0LTcuMjg2LTEuNzc2LTcuMjg2LTcuOTA2YzAtMS43NDcsMC42MjMtMy4xNzQsMS42NDYtNC4yOTJDNy4yOCwxMC40NjQsNi43Myw4LjgzNyw3LjYwMiw2LjYzNCAgYzAsMCwxLjM0My0wLjQzLDQuMzk4LDEuNjQxYzEuMjc2LTAuMzU1LDIuNjQ1LTAuNTMyLDQuMDA1LTAuNTM4YzEuMzU5LDAuMDA2LDIuNzI3LDAuMTgzLDQuMDA1LDAuNTM4ICBjMy4wNTUtMi4wNyw0LjM5Ni0xLjY0MSw0LjM5Ni0xLjY0MWMwLjg3MiwyLjIwMywwLjMyMywzLjgzLDAuMTU5LDQuMjM0YzEuMDIzLDEuMTE4LDEuNjQ0LDIuNTQ1LDEuNjQ0LDQuMjkyICBjMCw2LjE0Ni0zLjc0LDcuNDk4LTcuMzA0LDcuODkzQzE5LjQ3OSwyMy41NDgsMjAsMjQuNTA4LDIwLDI2YzAsMiwwLDMuOTAyLDAsNC40MjhjMCwwLjQyOCwwLjI1OCwwLjkwMSwxLjA3LDAuNzQ2ICBDMjcuNDIyLDI5LjA1NSwzMiwyMy4wNjIsMzIsMTUuOTk3QzMyLDcuMTYyLDI0LjgzOCwwLDE2LjAwMywweiIgZmlsbD0iIzE4MTYxNiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PC9zdmc+`, 
            name: 'GitHub',
            link: 'https://github.com/breno05s'
        },
        {
            img: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDY0IDY0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojMDA3ZmI1O30uY2xzLTJ7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48dGl0bGUvPjxnIGRhdGEtbmFtZT0iMTQtbGlua2VkaW4iIGlkPSJfMTQtbGlua2VkaW4iPjxyZWN0IGNsYXNzPSJjbHMtMSIgaGVpZ2h0PSI2NCIgcng9IjExLjIiIHJ5PSIxMS4yIiB3aWR0aD0iNjQiLz48cmVjdCBjbGFzcz0iY2xzLTIiIGhlaWdodD0iMzIuNzIiIHdpZHRoPSI5LjAzIiB4PSI4Ljk5IiB5PSIyMy41NCIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTQ4LjIsMjMuNTRDNDEuNTQsMjEsMzYuNzIsMjUuMywzNC42NiwyNy43VjIzLjU0aC05VjU2LjI2aDlWMzlhOC40NSw4LjQ1LDAsMCwxLDIuMjMtNS45Miw0Ljc1LDQuNzUsMCwwLDEsMy40MS0xLjY3QTUuNDIsNS40MiwwLDAsMSw0NC4yNCwzM2E2LjEzLDYuMTMsMCwwLDEsMS43LDQuMzVWNTYuMjZINTYuMVYzNlM1Ny4yMywyNi45Miw0OC4yLDIzLjU0WiIvPjxjaXJjbGUgY2xhc3M9ImNscy0yIiBjeD0iMTMuNSIgY3k9IjEzLjM4IiByPSI1LjY0Ii8+PC9nPjwvc3ZnPg==`, 
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/breno-louren%C3%A7o-a4a807235'
        },
        {
            img: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGc+PHBhdGggZD0iTTIyLDNIMkMwLjg5NzQ2MDksMywwLDMuODk2OTcyNywwLDV2MTRjMCwxLjEwMzAyNzMsMC44OTc0NjA5LDIsMiwyaDIwYzEuMTAyNTM5MSwwLDItMC44OTY5NzI3LDItMlY1ICAgQzI0LDMuODk2OTcyNywyMy4xMDI1MzkxLDMsMjIsM3oiIGZpbGw9IiNGMkYyRjIiLz48cGF0aCBkPSJNMywyMWgxOWMxLjEwMjUzOTEsMCwyLTAuODk2OTcyNywyLTJWNS4xMjU0OTAyTDMsMjF6IiBmaWxsPSIjRjVGNUY1Ii8+PGxpbmVhckdyYWRpZW50IGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iU1ZHSURfMV8iIHgxPSI3LjkxNTUxMDciIHgyPSIxOS4xODAyNDQ0IiB5MT0iMTAuNDU4NjUzNSIgeTI9IjE1LjcxMTQ4NTkiPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRkZGRjtzdG9wLW9wYWNpdHk6MC4yIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGO3N0b3Atb3BhY2l0eTowIi8+PC9saW5lYXJHcmFkaWVudD48cG9seWdvbiBmaWxsPSJ1cmwoI1NWR0lEXzFfKSIgcG9pbnRzPSIzLDIxIDMuMzMwNjg4NSwyMSAyNCw1LjM3NTQ4ODMgMjQsNS4xMjU0ODgzICAiLz48cGF0aCBkPSJNMCw1LjExNzY0NzJWMTljMCwxLjEwMzAyNzMsMC44OTc0NjA5LDIsMiwyaDFWNy4zMzUwMzY4ICAgQzEuMzE5NTE5LDYuMDkyOTcxMywwLjkwOTE3OTcsNS43ODk2NDQyLDAsNS4xMTc2NDcyeiIgZmlsbD0iI0QzMkYyRiIvPjxwYXRoIGQ9Ik0yMSw3LjM0MzQ5NTRWMjFoMWMxLjEwMjUzOTEsMCwyLTAuODk2OTcyNywyLTJWNS4xMjU0OTAyTDIxLDcuMzQzNDk1NHoiIGZpbGw9IiNEMzJGMkYiLz48bGluZWFyR3JhZGllbnQgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJTVkdJRF8yXyIgeDE9IjE4Ljg5MDM3NTEiIHgyPSIyNi42MzIxNzE2IiB5MT0iOS40NTMxMjAyIiB5Mj0iMTcuMTk0OTE1OCI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eTowLjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjAiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGQ9Ik0yMSw3LjM0MzQ5NTRWMjFoMWMxLjEwMjUzOTEsMCwyLTAuODk2OTcyNywyLTJWNS4xMjU0OTAyTDIxLDcuMzQzNDk1NHoiIGZpbGw9InVybCgjU1ZHSURfMl8pIi8+PHBvbHlnb24gZmlsbD0iI0Y1RjVGNSIgcG9pbnRzPSIyMS40OTk5MzksMyAyLjUwMDA2MSwzIDEyLDEwLjMxMjUgICIvPjxwYXRoIGQ9Ik0yNCw1LjEzMDQzMjFWNWMwLTEuMTAzMDI3My0wLjg5NzQ2MDktMi0yLTJoLTAuNTAwMDYxTDEyLDEwLjMxMjVMMi41MDAwNjEsM0gyICAgQzAuODk3NDYwOSwzLDAsMy44OTY5NzI3LDAsNXYwLjEzMDQ5MzJsMTIsOS4wNjYxNDU5TDI0LDUuMTMwNDMyMXoiIGZpbGw9IiNEMzJGMkYiLz48bGluZWFyR3JhZGllbnQgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJTVkdJRF8zXyIgeDE9IjEuNTI3OTA1NiIgeDI9IjIxLjQ2MTA1IiB5MT0iMS4yODAyNTIyIiB5Mj0iMTAuNTc1MjI5NiI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGO3N0b3Atb3BhY2l0eTowLjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkZGRkY7c3RvcC1vcGFjaXR5OjAiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGQ9Ik0yNCw1LjEzMDQzMjFWNWMwLTEuMTAzMDI3My0wLjg5NzQ2MDktMi0yLTJoLTAuNTAwMDYxTDEyLDEwLjMxMjVMMi41MDAwNjEsM0gyICAgQzAuODk3NDYwOSwzLDAsMy44OTY5NzI3LDAsNXYwLjEzMDQ5MzJsMTIsOS4wNjYxNDU5TDI0LDUuMTMwNDMyMXoiIGZpbGw9InVybCgjU1ZHSURfM18pIi8+PHBhdGggZD0iTTEyLDEzLjk0NjU5NDJMMC4wMTEyMzA1LDQuODg4OTc3MUMwLjAwOTA5NDIsNC45MjY0NTI2LDAsNC45NjE5NzUxLDAsNXYwLjEzMDQ5MzJsMTIsOS4wNjYxMDExICAgbDEyLTkuMDY2MTYyMVY1YzAtMC4wMzgwMjQ5LTAuMDA5MDk0Mi0wLjA3MzU0NzQtMC4wMTEyMzA1LTAuMTExMDg0TDEyLDEzLjk0NjU5NDJ6IiBvcGFjaXR5PSIwLjEiLz48cGF0aCBkPSJNMjIsMjAuNzVIMmMtMS4xMDI1MzkxLDAtMi0wLjg5Njk3MjctMi0yVjE5YzAsMS4xMDMwMjczLDAuODk3NDYwOSwyLDIsMmgyMGMxLjEwMjUzOTEsMCwyLTAuODk2OTcyNywyLTIgICB2LTAuMjVDMjQsMTkuODUzMDI3MywyMy4xMDI1MzkxLDIwLjc1LDIyLDIwLjc1eiIgb3BhY2l0eT0iMC4xIi8+PGxpbmVhckdyYWRpZW50IGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iU1ZHSURfNF8iIHgxPSIyMy43MTQ3MDY0IiB4Mj0iMjMuOTk0NCIgeTE9IjQuMTY1NjAzNiIgeTI9IjQuNDQ1Mjk3MiI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eTowLjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjAiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGQ9Ik0yMy43Nzc1ODc5LDQuMTAyNzIyMkwyMy43Nzc1ODc5LDQuMTAyNzIyMiAgIGMwLjA2NTAwMjQsMC4xMjgxNzM4LDAuMTE1ODQ0NywwLjI2NDM0MzMsMC4xNTM5MzA3LDAuNDA1NDU2NUMyMy44OTUxNDE2LDQuMzY1NzgzNywyMy44NDI3MTI0LDQuMjMxMDc5MSwyMy43Nzc1ODc5LDQuMTAyNzIyMnoiIGZpbGw9InVybCgjU1ZHSURfNF8pIi8+PGxpbmVhckdyYWRpZW50IGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iU1ZHSURfNV8iIHgxPSIyMy44NDExMjU1IiB4Mj0iMjQuMTAwMzQxOCIgeTE9IjQuNjQwNDQxOSIgeTI9IjQuODk5NjU4MiI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eTowLjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjAiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGQ9Ik0yMy45NDE0NjczLDQuNTQwMTAwMUMyMy45Nzg1NzY3LDQuNjg3NSwyNCw0Ljg0MDg4MTMsMjQsNSAgIEMyNCw0Ljg0MTA2NDUsMjMuOTc2NjIzNSw0LjY4ODQxNTUsMjMuOTQxNDY3Myw0LjU0MDEwMDF6IiBmaWxsPSJ1cmwoI1NWR0lEXzVfKSIvPjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9IlNWR0lEXzZfIiB4MT0iNi41MDExNDQ0IiB4Mj0iMjUuMzgwOTM1NyIgeTE9Ii0wLjQzMzYzOTUiIHkyPSIxOC40NDYxNTE3Ij48c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjAuMSIvPjxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MCIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZD0iTTAuNTMzNzUyNCw1LjUzMzc1MjRMMTYsMjFoNmMxLjEwMjUzOTEsMCwyLTAuODk2OTcyNywyLTJWNS4xMzA0MzIxbC0xMiw5LjA2NjE2MjEgICBMMC41MzM3NTI0LDUuNTMzNzUyNHoiIGZpbGw9InVybCgjU1ZHSURfNl8pIi8+PHBhdGggZD0iTTIyLDNIMkMwLjg5NzQ2MDksMywwLDMuODk2OTcyNywwLDV2MC4yNWMwLTEuMTAzMDI3MywwLjg5NzQ2MDktMiwyLTJoMjAgICBjMS4xMDI1MzkxLDAsMiwwLjg5Njk3MjcsMiwyVjVDMjQsMy44OTY5NzI3LDIzLjEwMjUzOTEsMywyMiwzeiIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC4yIi8+PGxpbmVhckdyYWRpZW50IGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iU1ZHSURfN18iIHgxPSItMC43MDc2MTUxIiB4Mj0iMjQuNzA3NjE0OSIgeTE9IjYuMDc0MzQxOCIgeTI9IjE3LjkyNTY1OTIiPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRkZGRjtzdG9wLW9wYWNpdHk6MC4xIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGO3N0b3Atb3BhY2l0eTowIi8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJNMjIsM0gyQzAuODk3NDYwOSwzLDAsMy44OTY5NzI3LDAsNXYxNGMwLDEuMTAzMDI3MywwLjg5NzQ2MDksMiwyLDJoMjAgICBjMS4xMDI1MzkxLDAsMi0wLjg5Njk3MjcsMi0yVjVDMjQsMy44OTY5NzI3LDIzLjEwMjUzOTEsMywyMiwzeiIgZmlsbD0idXJsKCNTVkdJRF83XykiLz48L2c+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PC9zdmc+`, 
            name: 'Email',
            link: 'mailto:breno.info002@gmail.com'
        },
    ]

    const skills = [
        {
            img: `https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png`, 
            name: 'Visual Studio Code'
        },
        {
            img: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMCIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iMzJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGc+PHBvbHlnb24gZmlsbD0iI0U0NEQyNiIgcG9pbnRzPSIyNy4zNzcsMjguODg5IDE2LjAwMSwzMiA0LjYyNSwyOC44ODkgMiwwIDMwLjAwMiwwICAiLz48cG9seWdvbiBmaWxsPSIjRkY2QzM5IiBwb2ludHM9IjE2LDIgMTYsMjkuNzUgMjUuMjMyLDI3LjAwOCAyNy42ODgsMiAgIi8+PHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIyNC4zNjMsNiA3LjYwNyw2IDgsMTAgOC42MTksMTcgMTkuNTAzLDE3IDE5LjE0OCwyMC45ODQgMTYsMjEuOTkgMTIuODU3LDIwLjk4NCAxMi42NDgsMTkgICAgOC44MDMsMTkgOS4yNjIsMjMuOTg3IDE2LDI1Ljk5IDIyLjcyOCwyMy45ODYgMjMuNzE4LDEzIDEyLjI1MiwxMyAxMi4wMDIsMTAgMjQsMTAgICIvPjwvZz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48L3N2Zz4=`, 
            name: 'HTML5'
        },
        {
            img: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMCIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iMzJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGc+PHBvbHlnb24gZmlsbD0iIzFGNjJBRSIgcG9pbnRzPSIyNy4zNzcsMjguODg5IDE2LjAwMSwzMiA0LjYyNSwyOC44ODkgMiwwIDMwLjAwMiwwICAiLz48cG9seWdvbiBmaWxsPSIjMzQ3REM2IiBwb2ludHM9IjE2LDIgMTYsMjkuNzUgMjUuMjMyLDI3LjAwOCAyNy42ODgsMiAgIi8+PHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIyNC4zNjMsNiA3LjYwNyw2IDgsMTAgMTYsMTAgOC4yNSwxMi45OSA4LjYxOSwxNyAxOS41MDIsMTcgMTkuMTU4LDIxIDE2LDIxLjk5IDEyLjg2MSwyMC45ODQgICAgMTIuNTMzLDE5IDguODAzLDE5IDkuMjYyLDIzLjk4NyAxNiwyNS45OSAyMi43MjgsMjMuOTg2IDIzLjcxOSwxMi45OSAxNi4wMjYsMTIuOTkgMjQsMTAgICIvPjwvZz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48L3N2Zz4=`, 
            name: 'CSS3'
        },
        {
            img: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJfeDMxXzg3LWpzIj48Zz48cmVjdCBoZWlnaHQ9IjQ1OS45OTgiIHN0eWxlPSJmaWxsOiNGMERCNEY7IiB3aWR0aD0iNDU5Ljk5NiIgeD0iMjYuMDAyIiB5PSIyNi4wMDEiLz48cGF0aCBkPSJNMjc2LjMzMSwzODQuNzU5YzAsNDQuNzY3LTI2LjI4Niw2NS4yLTY0LjU4Niw2NS4yYy0zNC42MDEsMC01NC42MjMtMTcuODY1LTY0Ljg5Mi0zOS41MjkgICAgbDM1LjIxOC0yMS4yNTVjNi43NzcsMTIuMDEzLDEyLjkzOCwyMi4xNzcsMjcuODI2LDIyLjE3N2MxNC4xNjksMCwyMy4yMDctNS41NDQsMjMuMjA3LTI3LjIwOFYyMzcuMjFoNDMuMjI3VjM4NC43NTkgICAgTDI3Ni4zMzEsMzg0Ljc1OXoiIHN0eWxlPSJmaWxsOiMzMjMzMzA7Ii8+PHBhdGggZD0iTTM3OC41OTgsNDQ5Ljk1OWMtNDAuMTQ3LDAtNjYuMTI0LTE5LjA5OS03OC43NTQtNDQuMTUxbDM1LjIxOS0yMC4zMzIgICAgYzkuMjQxLDE1LjA5NSwyMS4zNTYsMjYuMjg2LDQyLjYxMSwyNi4yODZjMTcuODY2LDAsMjkuMzY0LTguOTMyLDI5LjM2NC0yMS4zNTVjMC0xNC43ODctMTEuNzA0LTIwLjAyMS0zMS41Mi0yOC43NWwtMTAuNzgxLTQuNjIgICAgYy0zMS4yMTQtMTMuMjQ2LTUxLjg1My0yOS45ODMtNTEuODUzLTY1LjJjMC0zMi40NDcsMjQuNzQ1LTU3LjA5LDYzLjI0OC01Ny4wOWMyNy41MTgsMCw0Ny4yMzIsOS41NDksNjEuNDAyLDM0LjYwMyAgICBsLTMzLjY3OSwyMS41NjJjLTcuMzkyLTEzLjI0Ni0xNS40MDEtMTguNDgxLTI3LjgyNS0xOC40ODFjLTEyLjYzLDAtMjAuNjM5LDguMDEtMjAuNjM5LDE4LjQ4MSAgICBjMCwxMi45MzgsOC4wMDksMTguMTc2LDI2LjU5NCwyNi4yODVsMTAuNzgsNC42MjFjMzYuNzU5LDE1LjcxLDU3LjM5NywzMS44MzIsNTcuMzk3LDY3Ljk3NCAgICBDNDUwLjE2NCw0MjguNjAyLDQxOS41NjUsNDQ5Ljk1OSwzNzguNTk4LDQ0OS45NTlMMzc4LjU5OCw0NDkuOTU5eiIgc3R5bGU9ImZpbGw6IzMyMzMzMDsiLz48L2c+PC9nPjxnIGlkPSJMYXllcl8xIi8+PC9zdmc+`, 
            name: 'JavaScript'
        },
        {
            img: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMTAwJSIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgd2lkdGg9IjEwMCUiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuMjUzMDUsMCwwLDEuMjUzMDUsLTE2LjMwNzYsNC41NzE5MSkiPjxjaXJjbGUgY3g9IjY0IiBjeT0iNDcuNSIgcj0iOS4zIiBzdHlsZT0iZmlsbDpyZ2IoOTcsMjE4LDI1MSk7Ii8+PHBhdGggZD0iTTY0LDgxLjdDNzEuMyw4OC44IDc4LjUsOTMgODQuMyw5M0M4Ni4yLDkzIDg4LDkyLjYgODkuNSw5MS43Qzk0LjcsODguNyA5Ni42LDgxLjIgOTQuOCw3MC41Qzk0LjUsNjguNiA5NC4xLDY2LjcgOTMuNiw2NC43Qzk1LjYsNjQuMSA5Ny40LDYzLjUgOTkuMiw2Mi45QzEwOS4zLDU5IDExNC45LDUzLjYgMTE0LjksNDcuN0MxMTQuOSw0MS43IDEwOS4zLDM2LjMgOTkuMiwzMi41Qzk3LjQsMzEuOCA5NS42LDMxLjIgOTMuNiwzMC43Qzk0LjEsMjguNyA5NC41LDI2LjggOTQuOCwyNC45Qzk2LjUsMTQgOTQuNiw2LjQgODkuNCwzLjRDODcuOSwyLjUgODYuMSwyLjEgODQuMiwyLjFDNzguNSwyLjEgNzEuMiw2LjMgNjMuOSwxMy40QzU2LjcsNi4zIDQ5LjUsMi4xIDQzLjcsMi4xQzQxLjgsMi4xIDQwLDIuNSAzOC41LDMuNEMzMy4zLDYuNCAzMS40LDEzLjkgMzMuMiwyNC42QzMzLjUsMjYuNSAzMy45LDI4LjQgMzQuNCwzMC40QzMyLjQsMzEgMzAuNiwzMS42IDI4LjgsMzIuMkMxOC43LDM2LjEgMTMuMSw0MS41IDEzLjEsNDcuNEMxMy4xLDUzLjQgMTguNyw1OC44IDI4LjgsNjIuNkMzMC42LDYzLjMgMzIuNCw2My45IDM0LjQsNjQuNEMzMy45LDY2LjQgMzMuNSw2OC4zIDMzLjIsNzAuMkMzMS41LDgwLjkgMzMuNCw4OC41IDM4LjUsOTEuNEM0MCw5Mi4zIDQxLjgsOTIuNyA0My43LDkyLjdDNDkuNSw5Mi45IDU2LjcsODguNyA2NCw4MS43Wk01OC40LDY4LjJDNjAuMiw2OC4zIDYyLjEsNjguMyA2NCw2OC4zQzY1LjksNjguMyA2Ny44LDY4LjMgNjkuNiw2OC4yQzY3LjgsNzAuNiA2NS45LDcyLjggNjQsNzQuOUM2Mi4xLDcyLjggNjAuMiw3MC42IDU4LjQsNjguMlpNNDYsNTcuOUM0Nyw1OS42IDQ3LjksNjEuMiA0OSw2Mi44QzQ1LjksNjIuNCA0Myw2MS45IDQwLjIsNjEuM0M0MS4xLDU4LjYgNDIuMSw1NS44IDQzLjMsNTNDNDQuMSw1NC42IDQ1LDU2LjMgNDYsNTcuOVpNNDAuMiwzMy44QzQzLDMzLjIgNDUuOSwzMi43IDQ5LDMyLjNDNDgsMzMuOSA0NywzNS41IDQ2LDM3LjJDNDUsMzguOSA0NC4xLDQwLjUgNDMuMyw0Mi4yQzQyLDM5LjMgNDEsMzYuNSA0MC4yLDMzLjhaTTQ1LjcsNDcuNUM0Nyw0NC44IDQ4LjQsNDIuMSA1MCwzOS40QzUxLjUsMzYuOCA1My4yLDM0LjIgNTQuOSwzMS42QzU3LjksMzEuNCA2MC45LDMxLjMgNjQsMzEuM0M2Ny4yLDMxLjMgNzAuMiwzMS40IDczLjEsMzEuNkM3NC45LDM0LjIgNzYuNSwzNi44IDc4LDM5LjRDNzkuNiw0Mi4xIDgxLDQ0LjggODIuMyw0Ny41QzgxLDUwLjIgNzkuNiw1Mi45IDc4LDU1LjZDNzYuNSw1OC4yIDc0LjgsNjAuOCA3My4xLDYzLjRDNzAuMSw2My42IDY3LjEsNjMuNyA2NCw2My43QzYwLjgsNjMuNyA1Ny44LDYzLjYgNTQuOSw2My40QzUzLjEsNjAuOCA1MS41LDU4LjIgNTAsNTUuNkM0OC40LDUyLjkgNDcsNTAuMiA0NS43LDQ3LjVaTTg0LjgsNDIuMUw4Mi4xLDM3LjFDODEuMSwzNS40IDgwLjIsMzMuOCA3OS4xLDMyLjJDODIuMiwzMi42IDg1LjEsMzMuMSA4Ny45LDMzLjdDODcsMzYuNSA4NiwzOS4zIDg0LjgsNDIuMVpNODQuOCw1Mi45Qzg2LDU1LjcgODcsNTguNSA4Ny45LDYxLjJDODUuMSw2MS44IDgyLjIsNjIuMyA3OS4xLDYyLjdDODAuMSw2MS4xIDgxLjEsNTkuNSA4Mi4xLDU3LjhDODMsNTYuMyA4My45LDU0LjYgODQuOCw1Mi45Wk04Ny4xLDg3LjZDODYuMyw4OC4xIDg1LjMsODguMyA4NC4yLDg4LjNDNzkuMyw4OC4zIDczLjIsODQuMyA2Ny4yLDc4LjNDNzAuMSw3NS4yIDcyLjksNzEuNyA3NS43LDY3LjhDODAuNCw2Ny40IDg0LjksNjYuNyA4OS4xLDY1LjdDODkuNiw2Ny41IDg5LjksNjkuMyA5MC4yLDcxLjFDOTEuNiw3OS42IDkwLjUsODUuNyA4Ny4xLDg3LjZaTTkyLjMsMzQuOUMxMDMuNSwzOC4xIDExMC4yLDQzIDExMC4yLDQ3LjVDMTEwLjIsNTEuNCAxMDUuNiw1NS4zIDk3LjUsNTguNEM5NS45LDU5IDk0LjEsNTkuNiA5Mi4zLDYwLjFDOTEsNTYgODkuNCw1MS44IDg3LjQsNDcuNUM4OS40LDQzLjIgOTEuMSwzOSA5Mi4zLDM0LjlaTTg0LjMsNi43Qzg1LjQsNi43IDg2LjMsNi45IDg3LjIsNy40QzkwLjUsOS4zIDkxLjcsMTUuMyA5MC4zLDIzLjlDOTAsMjUuNiA4OS42LDI3LjQgODkuMiwyOS4zQzg1LDI4LjQgODAuNSwyNy43IDc1LjgsMjcuMkM3My4xLDIzLjMgNzAuMiwxOS44IDY3LjMsMTYuN0M3My4zLDEwLjggNzkuNCw2LjcgODQuMyw2LjdaTTY5LjYsMjYuOEM2Ny44LDI2LjcgNjUuOSwyNi43IDY0LDI2LjdDNjIuMSwyNi43IDYwLjIsMjYuNyA1OC40LDI2LjhDNjAuMiwyNC40IDYyLjEsMjIuMiA2NCwyMC4xQzY1LjksMjIuMiA2Ny44LDI0LjUgNjkuNiwyNi44Wk00MC45LDcuNEM0MS43LDYuOSA0Mi43LDYuNyA0My44LDYuN0M0OC43LDYuNyA1NC44LDEwLjcgNjAuOCwxNi43QzU3LjksMTkuOCA1NS4xLDIzLjMgNTIuMywyNy4yQzQ3LjYsMjcuNiA0My4xLDI4LjMgMzguOSwyOS4zQzM4LjQsMjcuNSAzOC4xLDI1LjcgMzcuOCwyMy45QzM2LjQsMTUuNCAzNy41LDkuNCA0MC45LDcuNFpNMzUuNyw2MC4xQzI0LjUsNTYuOSAxNy44LDUyIDE3LjgsNDcuNUMxNy44LDQzLjYgMjIuNCwzOS43IDMwLjUsMzYuNkMzMi4xLDM2IDMzLjksMzUuNCAzNS43LDM0LjlDMzcsMzkgMzguNiw0My4yIDQwLjYsNDcuNUMzOC42LDUxLjggMzYuOSw1Ni4xIDM1LjcsNjAuMVpNMzcuOCw3MS4xQzM4LjEsNjkuNCAzOC41LDY3LjYgMzguOSw2NS43QzQzLjEsNjYuNiA0Ny42LDY3LjMgNTIuMyw2Ny44QzU1LDcxLjcgNTcuOSw3NS4yIDYwLjgsNzguM0M1NC44LDg0LjIgNDguNyw4OC4zIDQzLjgsODguM0M0Mi43LDg4LjMgNDEuOCw4OC4xIDQwLjksODcuNkMzNy41LDg1LjcgMzYuNCw3OS42IDM3LjgsNzEuMVoiIHN0eWxlPSJmaWxsOnJnYig5NywyMTgsMjUxKTtmaWxsLXJ1bGU6bm9uemVybzsiLz48L2c+PC9zdmc+`, 
            name: 'React.js'
        },
        {
            img: `data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1.83em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 140"%3E%3Cpath d="M78.066 92.588c12.818 0 23.209-10.391 23.209-23.21c0-12.817-10.391-23.208-23.21-23.208c-12.817 0-23.208 10.39-23.208 23.209c0 12.818 10.391 23.209 23.209 23.209Zm-54.857 46.417c12.818 0 23.209-10.39 23.209-23.209c0-12.817-10.391-23.208-23.21-23.208C10.392 92.588 0 102.978 0 115.796c0 12.818 10.39 23.21 23.209 23.21Zm209.582 0c12.818 0 23.209-10.39 23.209-23.209c0-12.817-10.39-23.208-23.209-23.208c-12.818 0-23.209 10.39-23.209 23.208c0 12.818 10.391 23.21 23.21 23.21Z"%2F%3E%3Cpath fill="%23D0021B" d="M156.565 70.357c-.742-7.754-1.12-14.208-7.06-18.744c-7.522-5.744-16.044-2.017-26.54-5.806C112.65 43.312 105 34.155 105 23.24C105 10.405 115.578 0 128.626 0c9.665 0 17.974 5.707 21.634 13.883c5.601 10.64 1.96 21.467 8.998 26.921c8.333 6.458 19.568 1.729 32.104 7.848a23.614 23.614 0 0 1 9.84 8.425A22.858 22.858 0 0 1 205 69.718c0 10.915-7.65 20.073-17.964 22.568c-10.497 3.789-19.019.062-26.541 5.806c-8.46 6.46-3.931 17.267-10.826 28.682c-3.913 7.518-11.867 12.663-21.043 12.663c-13.048 0-23.626-10.405-23.626-23.24c0-9.323 5.582-17.364 13.638-21.066c12.536-6.12 23.77-1.39 32.104-7.848c4.807-3.726 5.823-9.473 5.823-16.926Z"%2F%3E%3C%2Fsvg%3E`, 
            name: 'React Router'
        },
        {
            img: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGc+PHBhdGggZD0iTTIzLjU2MTUyMzQsMTAuOTMyMDIyMWMtMC4wMDA5NzY2LDAtMC4wMDA5NzY2LTAuMDAwNDg4My0wLjAwMDk3NjYtMC4wMDA0ODgzTDEzLjA2MTUyMzQsMC40MjU2NzQ0ICAgYy0wLjU2NjQwNjMtMC41Njc3NDktMS41NTc2MTcyLTAuNTY3MjYwNy0yLjEyMjA3MDMtMC4wMDA0ODgzTDAuNDM4NDc2NiwxMC45MzIwMjIxQzAuMTU2MjUsMTEuMjE1ODk2NiwwLDExLjU5MjYwNTYsMCwxMS45OTI3NTIxICAgYzAsMC40MDA2MzQ4LDAuMTU2MjUsMC43Nzc3NzEsMC40Mzk0NTMxLDEuMDYxMTU3MmwxMC40OTkwMjM0LDEwLjUwNTg1OTQgICBDMTEuMjIxNjc5NywyMy44NDM2NDMyLDExLjU5ODYzMjgsMjQuMDAwMDE1MywxMiwyNC4wMDAwMTUzczAuNzc4MzIwMy0wLjE1NjM3MjEsMS4wNjA1NDY5LTAuNDM5NzU4M2wxMC41LTEwLjUwNjM0NzcgICBDMjMuODQzNzUsMTIuNzcwNTIzMSwyNCwxMi4zOTMzODY4LDI0LDExLjk5Mjc1MjFDMjQsMTEuNTkyNjA1NiwyMy44NDM3NSwxMS4yMTU4OTY2LDIzLjU2MTUyMzQsMTAuOTMyMDIyMXoiIGZpbGw9IiNFRjQ3M0IiLz48cGF0aCBkPSJNMjMuNjgwOTY5MiwxMi42ODk4OTU2bC0xMC42MDkzNzUsMTAuNjE1NzgzNyAgIEMxMi43ODY0MzgsMjMuNTkxOTk1MiwxMi40MDU1MTc2LDIzLjc1MDAxNTMsMTIsMjMuNzUwMDE1M3MtMC43ODY0MzgtMC4xNTgwMi0xLjA3MjU3MDgtMC40NDQ4MjQyTDAuMzE5MDMwOCwxMi42ODk4OTU2ICAgYy0wLjEyMzk2MjQtMC4xMjQwODQ1LTAuMjE4Njg5LTAuMjY4MzcxNi0wLjI5MjExNDMtMC40MjIyNDEyYzAuMDU0NTY1NCwwLjI5NTk1OTUsMC4xOTUzMTI1LDAuNTY4OTA4NywwLjQxMjUzNjYsMC43ODYyNTQ5ICAgbDEwLjQ5OTAyMzQsMTAuNTA1ODU5NEMxMS4yMjE2Nzk3LDIzLjg0MzY0MzIsMTEuNTk4NjMyOCwyNC4wMDAwMTUzLDEyLDI0LjAwMDAxNTNzMC43NzgzMjAzLTAuMTU2MzcyMSwxLjA2MDU0NjktMC40Mzk3NTgzICAgbDEwLjUtMTAuNTA2MzQ3N2MwLjIxNzIyNDEtMC4yMTczNDYyLDAuMzU4MDMyMi0wLjQ5MDI5NTQsMC40MTI1OTc3LTAuNzg2MjU0OSAgIEMyMy44OTk3MTkyLDEyLjQyMTUyNCwyMy44MDQ5MzE2LDEyLjU2NTgxMTIsMjMuNjgwOTY5MiwxMi42ODk4OTU2eiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iMC4xIi8+PHBhdGggZD0iTTE3LDEwLjAwMDAxNTNjLTAuMzc0ODc3OSwwLTAuNzIxOTg0OSwwLjExMDA0NjQtMS4wMjIyMTY4LDAuMjkwMjgzMmwtMi4yNjgwNjY0LTIuMjY4MDY2NCAgIEMxMy44ODk4OTI2LDcuNzIyMDYxMiwxNCw3LjM3NDk1NDIsMTQsNy4wMDAwMTUzYzAtMS4xMDMwMjczLTAuODk3NDYwOS0yLTItMiAgIGMtMC4zNjk4NzMsMC0wLjcxMjI4MDMsMC4xMDc3ODgxLTEuMDA5ODI2NywwLjI4MzU2OTNMOC41MzY0MzgsMi44Mjk1NDQxTDcuODI5NTg5OCwzLjUzNjc1ODRsMi40NTM2NzQzLDIuNDUzOTc5NSAgIEMxMC4xMDc3MjcxLDYuMjg4MTAxMiwxMCw2LjYzMDMyNTMsMTAsNy4wMDAwMTUzYzAsMC45MjkzMjEzLDAuNjQwMDE0NiwxLjcwNTM4MzMsMS41LDEuOTI4OTU1MXY2LjE0MjA4OTggICBDMTAuNjQwMDE0NiwxNS4yOTQ2MzIsMTAsMTYuMDcwNjk0LDEwLDE3LjAwMDAxNTNjMCwxLjEwMzAyNzMsMC44OTc0NjA5LDIsMiwyczItMC44OTY5NzI3LDItMiAgIGMwLTAuOTI5MzIxMy0wLjY0MDAxNDYtMS43MDUzODMzLTEuNS0xLjkyODk1NTFWOC45Mjg5NzAzYzAuMTc2NzU3OC0wLjA0NTk1OTUsMC4zNDI1MjkzLTAuMTE1ODQ0NywwLjQ5Njg4NzItMC4yMDU1MDU0ICAgbDIuMjc5NjYzMSwyLjI3OTY2MzFDMTUuMTA1MzQ2NywxMS4yOTc4MDU4LDE1LDExLjYzNTMzMDIsMTUsMTIuMDAwMDE1M2MwLDEuMTAzMDI3MywwLjg5NzQ2MDksMiwyLDJzMi0wLjg5Njk3MjcsMi0yICAgUzE4LjEwMjUzOTEsMTAuMDAwMDE1MywxNywxMC4wMDAwMTUzeiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik0wLjQzODQ3NjYsMTEuMTgyMDIyMUwxMC45Mzk0NTMxLDAuNjc1MTg2MiAgIGMwLjU2NDQ1MzEtMC41NjY3NzI1LDEuNTU1NjY0MS0wLjU2NzI2MDcsMi4xMjIwNzAzLDAuMDAwNDg4M2wxMC40OTkwMjM0LDEwLjUwNTg1OTRjMCwwLDAsMC4wMDA0ODgzLDAuMDAwOTc2NiwwLjAwMDQ4ODMgICBjMC4yNTIzMTkzLDAuMjUzNzg0MiwwLjM5Njk3MjcsMC41ODMyNTIsMC40MjYyNjk1LDAuOTM1NzkxQzIzLjk5MTI3MiwxMi4wNzU5NDMsMjQsMTIuMDM1MjMyNSwyNCwxMS45OTI3NTIxICAgYzAtMC40MDAxNDY1LTAuMTU2MjUtMC43NzY4NTU1LTAuNDM4NDc2Ni0xLjA2MDczYy0wLjAwMDk3NjYsMC0wLjAwMDk3NjYtMC4wMDA0ODgzLTAuMDAwOTc2Ni0wLjAwMDQ4ODNMMTMuMDYxNTIzNCwwLjQyNTY3NDQgICBjLTAuNTY2NDA2My0wLjU2Nzc0OS0xLjU1NzYxNzItMC41NjcyNjA3LTIuMTIyMDcwMy0wLjAwMDQ4ODNMMC40Mzg0NzY2LDEwLjkzMjAyMjFDMC4xNTYyNSwxMS4yMTU4OTY2LDAsMTEuNTkyNjA1NiwwLDExLjk5Mjc1MjEgICBjMCwwLjA0MjQxOTQsMC4wMDg3MjgsMC4wODMxMjk5LDAuMDEyMjA3LDAuMTI0OTM5QzAuMDQxNTY0OSwxMS43NjUxNTIsMC4xODYyMTgzLDExLjQzNTc0NTIsMC40Mzg0NzY2LDExLjE4MjAyMjF6IiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwLjIiLz48bGluZWFyR3JhZGllbnQgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJTVkdJRF8xXyIgeDE9IjkuNjY5MjY1NyIgeDI9IjE4LjMwNjU5NDgiIHkxPSI5LjY3NjA4NjQiIHkyPSIxOC4zMTM0MTU1Ij48c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMTAxMDE7c3RvcC1vcGFjaXR5OjAuMSIvPjxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzAxMDEwMTtzdG9wLW9wYWNpdHk6MCIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZD0iTTE4LjU0ODgyODEsMTAuNzUwMzgxNUMxOC44MjY1MzgxLDExLjA5MzgyNjMsMTksMTEuNTI0ODU2NiwxOSwxMi4wMDAwMTUzICAgYzAsMS4xMDMwMjczLTAuODk3NDYwOSwyLTIsMnMtMi0wLjg5Njk3MjctMi0yYzAtMC4zNjQ2ODUxLDAuMTA1MzQ2Ny0wLjcwMjIwOTUsMC4yNzY1NTAzLTAuOTk2ODg3MkwxMi45OTY4ODcyLDguNzIzNDY1ICAgQzEyLjg0MjUyOTMsOC44MTMxMjU2LDEyLjY3Njc1NzgsOC44ODMwMTA5LDEyLjUsOC45Mjg5NzAzdjYuMTQyMDg5OGMwLjg1OTk4NTQsMC4yMjM1NzE4LDEuNSwwLjk5OTYzMzgsMS41LDEuOTI4OTU1MSAgIGMwLDEuMTAzMDI3My0wLjg5NzQ2MDksMi0yLDJjLTAuNTExNDc0NiwwLTAuOTczODE1OS0wLjE5ODY2OTQtMS4zMjc4ODA5LTAuNTE1NzQ3MWwzLjczMTgxMTUsMy43MzE4MTE1bDcuODAyOTE3NS03LjgwNzY3ODIgICBMMTguNTQ4ODI4MSwxMC43NTAzODE1eiBNMTMuNzA5NzE2OCw4LjAyMjIzMjFsMi4yNjgwNjY0LDIuMjY4MDY2NEMxNi4yNzgwMTUxLDEwLjExMDA2MTYsMTYuNjI1MTIyMSwxMC4wMDAwMTUzLDE3LDEwLjAwMDAxNTMgICBjMC40NzUwOTc3LDAsMC45MDYyNSwwLjE3MzUyMjksMS4yNDk4MTY5LDAuNDUxMzU1bC00LjY3NzY3MzMtNC42Nzc3MzQ0TDEzLjU2OTcwMjEsNS43NzU2NSAgIEMxMy44MzUxNDQsNi4xMTUwNjY1LDE0LDYuNTM2NjM2NCwxNCw3LjAwMDAxNTNDMTQsNy4zNzQ5NTQyLDEzLjg4OTg5MjYsNy43MjIwNjEyLDEzLjcwOTcxNjgsOC4wMjIyMzIxeiIgZmlsbD0idXJsKCNTVkdJRF8xXykiLz48bGluZWFyR3JhZGllbnQgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJTVkdJRF8yXyIgeDE9IjIuMDEzODE4NSIgeDI9IjIxLjk4MzM2NiIgeTE9IjcuMzM5OTIwNSIgeTI9IjE2LjY1MTg3MjYiPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRkZGRjtzdG9wLW9wYWNpdHk6MC4yIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGO3N0b3Atb3BhY2l0eTowIi8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJNMjMuNTYxNTIzNCwxMC45MzIwMjIxYy0wLjAwMDk3NjYsMC0wLjAwMDk3NjYtMC4wMDA0ODgzLTAuMDAwOTc2Ni0wLjAwMDQ4ODNMMTMuMDYxNTIzNCwwLjQyNTY3NDQgICBjLTAuNTY2NDA2My0wLjU2Nzc0OS0xLjU1NzYxNzItMC41NjcyNjA3LTIuMTIyMDcwMy0wLjAwMDQ4ODNMMC40Mzg0NzY2LDEwLjkzMjAyMjFDMC4xNTYyNSwxMS4yMTU4OTY2LDAsMTEuNTkyNjA1NiwwLDExLjk5Mjc1MjEgICBjMCwwLjQwMDYzNDgsMC4xNTYyNSwwLjc3Nzc3MSwwLjQzOTQ1MzEsMS4wNjExNTcybDEwLjQ5OTAyMzQsMTAuNTA1ODU5NCAgIEMxMS4yMjE2Nzk3LDIzLjg0MzY0MzIsMTEuNTk4NjMyOCwyNC4wMDAwMTUzLDEyLDI0LjAwMDAxNTNzMC43NzgzMjAzLTAuMTU2MzcyMSwxLjA2MDU0NjktMC40Mzk3NTgzbDEwLjUtMTAuNTA2MzQ3NyAgIEMyMy44NDM3NSwxMi43NzA1MjMxLDI0LDEyLjM5MzM4NjgsMjQsMTEuOTkyNzUyMUMyNCwxMS41OTI2MDU2LDIzLjg0Mzc1LDExLjIxNTg5NjYsMjMuNTYxNTIzNCwxMC45MzIwMjIxeiIgZmlsbD0idXJsKCNTVkdJRF8yXykiLz48L2c+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PC9zdmc+`, 
            name: 'Git'
        },
    ]

    const skillProp = [
        {
            class: 'vscode', name: 'Visual Studio Code', 
            text: 'Meu primeiro e favorito editor de codigo-fonte. Sempre uso para testes, desenvolver projetos e para prática de linguagens de programação. Comecei a usar em janeiro de 2022.'
        },
        {
            class: 'html5', name: 'HTML 5', 
            text: 'Linguagem de marcação que uso atualmente para construir páginas web. Acho uma linguagem bem simples e fácil de usar, nunca tive grandes problemas. Atualmente estou aprendendo sobre novas tags e procurando melhorar os nomes que dou para classes. Comecei a usar em fevereiro de 2022.'
        },
        {
            class: 'css3', name: 'CSS 3', 
            text: 'Linguagem de estilo que uso para deixar as páginas web com um bom visual. No começo tive dificuldades com o uso, mas com a devida prática e disciplina consegui superar e melhorar bastante. Gosto muito de fazer animações de transição e keyframes. Agora estou aprendendo sobre condições no CSS e SCSS também. Comecei a usar em fevereiro de 2022'
        },
        {
            class: 'js', name: 'JavaScript', 
            text: 'Minha primeira experiencia com linguagem de programação. Amo programar em javascript e renderizar elementos HTML de maneira automática, é bem gratificante. Comecei a usar em março de 2022'
        },
        {
            class: 'react', name: 'React.js', 
            text: 'Considero essa a melhor biblioteca javascript para criar interfaces. Acho execelente programar de forma imperativa aqui, criar componentes que gerenciam seu proprio estado e a facilidade para passar dados neles, muito bom de usar. Atualmente estou aprendendo mais sobre outros hooks que a biblioteca oferece. Comecei a usar em outubro de 2022'
        },
        {
            class: 'react_router', name: 'React Router', 
            text: 'Trata-se de uma biblioteca para react que permite fazer o roteamento de páginas da aplicação de maneira dinâmica. Considero essa uma excelente biblioteca para trabalhar com rotas, muito fácil de usar. Uso desde outubro de 2022'
        },
        {
            class: 'git', name: 'GIT', 
            text: 'É um sistema de controle de versões que uso para criar variantes dos meus projetos com simples comandos no prompt, e assim mantê-los a salvo no GitHub. Comecei a usar em Abril de 2022'
        },
    ]
    const projects = [
        {
            img: TodoList, name: 'Todo-list', 
            link: 'https://github.com/breno05s/todo-list-react',
            resume: 'Guarda e organiza tarefas que você precisa realizar ao longo do tempo'
        },
        {
            img: ControleFinanceiro, name: 'Controle financeiro', 
            link: 'https://github.com/breno05s/controle-financeiro',
            resume: 'Calcula suas receitas, despesas e mostra o saldo atual',
        },
    ]

    let [Class, setClass] = useState()
    let [skillName, setSkillName] = useState()
    let [skillText, setSkillText] = useState()
    let dialog = useRef(null);

    const attClass = (index, position, className) => {
        const attText = (item, currentClass) => {
            if (item.class === currentClass) {
                setSkillName(skillName = item.name)
                setSkillText(skillText = item.text)
            }
        }

        skillProp.forEach(item => {
            if (index === position) { 
                setClass(Class = className)
                attText(item, className)
            }
        })
    }

    const openModal = () => {
        dialog.current.showModal()
        dialog.current.style.opacity = 1
    }

    const handleModal = (index) => {
        attClass(index, 0, 'vscode')
        attClass(index, 1, 'html5')
        attClass(index, 2, 'css3')
        attClass(index, 3, 'js')
        attClass(index, 4, 'react')
        attClass(index, 5, 'react_router')
        attClass(index, 6, 'git')
        openModal()
    }

    const getTheme = () => JSON.parse(localStorage.getItem('theme')) ?? [];
    const setTheme = (database) => localStorage.setItem('theme', JSON.stringify(database));
    let theme = getTheme()

    const switchTheme = () => {
        if (document.body.className === '') { 
            theme = 'dark-mode'
            setTheme(theme)
        }
        else if (document.body.className === 'dark-mode') { 
            theme = ''
            setTheme(theme)
        }
        document.body.className = theme
    }
    

    useEffect(() => {
        Aos.init({duration: 400})
        document.body.className = theme
    }, [])
    return (
        <>
            <Header switchTheme={ switchTheme }/>
            <main>
                <section className="subject" id='subject'>
                    <div className='profile'>
                        <img className='me' src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQ7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGcgaWQ9ImluZm8iLz48ZyBpZD0iaWNvbnMiPjxwYXRoIGQ9Ik0xMiwwQzUuNCwwLDAsNS40LDAsMTJjMCw2LjYsNS40LDEyLDEyLDEyczEyLTUuNCwxMi0xMkMyNCw1LjQsMTguNiwwLDEyLDB6IE0xMiw0YzIuMiwwLDQsMi4yLDQsNXMtMS44LDUtNCw1ICAgcy00LTIuMi00LTVTOS44LDQsMTIsNHogTTE4LjYsMTkuNUMxNi45LDIxLDE0LjUsMjIsMTIsMjJzLTQuOS0xLTYuNi0yLjVjLTAuNC0wLjQtMC41LTEtMC4xLTEuNGMxLjEtMS4zLDIuNi0yLjIsNC4yLTIuNyAgIGMwLjgsMC40LDEuNiwwLjYsMi41LDAuNnMxLjctMC4yLDIuNS0wLjZjMS43LDAuNSwzLjEsMS40LDQuMiwyLjdDMTkuMSwxOC41LDE5LjEsMTkuMSwxOC42LDE5LjV6IiBpZD0idXNlcjIiLz48L2c+PC9zdmc+" alt="Subject photo" />
                        <h1 className='main-title-size'>Breno Lourenço</h1>
                        <p className='text-size' >Estudante e Desenvolvedor-Front-End</p>
                    </div>
                    <ul className='social-media'>
                        {socialMedia.map((item, index) => (
                            <li key={ index } title={ item.name }>
                                <a href={item.link} target='_blank'><img src={ item.img } alt={ item.name }/></a>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="about-me" id='aboutMe'>
                    <div className='padding-screen'>
                        <h1 className='sub-title-size' data-aos="fade-down">Olá!</h1>
                        <p data-aos="fade-down">
                            Eu sou Breno Lourenço e sou um desenvolvedor web front-end, dedicado a me tornar full-stack em um futuro não muito distante.<br/>
                            Gosto de codar, desenhar(hobby) e aprender coisas novas! Fique a vontade para entrar em contato ou ver minhas habilidades e projetos abaixo.
                        </p>
                    </div>
                </section>
                <section id='portfolio' className="portfolio">
                    <div className='title'>
                        <div className='padding-screen'>
                            <h1 className='main-title-size' data-aos="fade-down"> Portfolio </h1>
                        </div>
                    </div>
                    <div className='skills-and-projects padding-screen' >
                        <div data-aos="fade-down" className='skills'>
                            <h1 className='sub-title-size'>Habilidades</h1>
                            <ul className='border-gradient'>
                                {skills.map((skill, index) => (
                                    <li 
                                    onClick={ () => {
                                        handleModal(index)
                                    }} 
                                    key={ index } 
                                    title={ skill.name }>
                                        <img src={ skill.img } alt={ skill.name }/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div data-aos="fade-down" className='projects'>
                            <h1 className='sub-title-size'>Projetos</h1>
                            <ul className='border-gradient'>
                                {projects.map((project, index) => (
                                    <Project 
                                    key={ index }
                                    index={index} 
                                    img={project.img} 
                                    name={project.name} 
                                    resume={project.resume} 
                                    link ={project.link}/>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="timeline">

                    </div>
                </section>
            </main>
            <Footer switchTheme={ switchTheme }/>
            <Modal dialogRef={ dialog } className={ Class } skillName={ skillName} text={ skillText }/>
        </>
    )
}

export default Home