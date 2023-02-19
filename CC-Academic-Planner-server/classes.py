import json
from typing import Dict

import requests
from bs4 import BeautifulSoup


def update_classes() -> None:
    raw_data = fetch_data()
    classes = parse_data(raw_data)
    save_data(classes)


def fetch_data() -> bytes:
    # url = "https://ssbprod.conncoll.edu/CONN/bwckschd.p_get_crse_unsec"

    # payload = "term_in=202290&begin_ap=a&begin_hh=0&begin_mi=0&end_ap=a&end_hh=0&end_mi=0&sel_attr=dummy&sel_attr=%25&sel_camp=dummy&sel_crse=&sel_day=dummy&sel_from_cred=&sel_insm=dummy&sel_instr=dummy&sel_instr=%25&sel_levl=dummy&sel_ptrm=dummy&sel_schd=dummy&sel_sess=dummy&sel_subj=dummy&sel_subj=ACC&sel_subj=AFR&sel_subj=ASL&sel_subj=AMS&sel_subj=ANT&sel_subj=ARA&sel_subj=ARC&sel_subj=ART&sel_subj=AHI&sel_subj=AT&sel_subj=AST&sel_subj=BIO&sel_subj=BOT&sel_subj=CHM&sel_subj=CHI&sel_subj=CLA&sel_subj=COM&sel_subj=CRE&sel_subj=DAN&sel_subj=EAS&sel_subj=ECO&sel_subj=EDU&sel_subj=ENG&sel_subj=ES&sel_subj=FLM&sel_subj=FYS&sel_subj=FRH&sel_subj=GWS&sel_subj=GEO&sel_subj=GER&sel_subj=GIS&sel_subj=GOV&sel_subj=GRK&sel_subj=HBR&sel_subj=SPA&sel_subj=HIS&sel_subj=HMD&sel_subj=IS&sel_subj=CRT&sel_subj=DAT&sel_subj=ENT&sel_subj=FDP&sel_subj=GC&sel_subj=MRC&sel_subj=PAX&sel_subj=PKP&sel_subj=PBH&sel_subj=SJS&sel_subj=ITL&sel_subj=JPN&sel_subj=JS&sel_subj=LAT&sel_subj=LA&sel_subj=LIN&sel_subj=MAT&sel_subj=MSM&sel_subj=MUS&sel_subj=NEU&sel_subj=PHI&sel_subj=PHE&sel_subj=PHY&sel_subj=PSY&sel_subj=RUS&sel_subj=SLA&sel_subj=SOC&sel_subj=STA&sel_subj=THE&sel_title=&sel_to_cred="
    # headers = {
    #     'content-type': "application/x-www-form-urlencoded",
    #     'cache-control': "no-cache",
    #     'postman-token': "59831681-2095-a0a7-fc97-6c7cb8005cfb"
    # }

    # response = requests.request("POST", url, data=payload, headers=headers)

    # return response.content
    url = "https://ssbprod.conncoll.edu/CONN/bwckschd.p_get_crse_unsec"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "term_in": 202310,
        "begin_ap": "a",
        "begin_hh": "0",
        "begin_mi": "0",
        "end_ap": "a",
        "end_hh": "0",
        "end_mi": "0",
        "sel_attr": [
            "dummy",
            "%"
        ],
        "sel_camp": "dummy",
        "sel_crse": "",
        "sel_day": "dummy",
        "sel_from_cred": "",
        "sel_insm": "dummy",
        "sel_instr": [
            "dummy",
            "%"
        ],
        "sel_levl": "dummy",
        "sel_ptrm": "dummy",
        "sel_schd": "dummy",
        "sel_sess": "dummy",
        "sel_subj": [
            "dummy",
            "ACC",
            "AFR",
            "ASL",
            "AMS",
            "ANT",
            "ARA",
            "ARC",
            "ART",
            "AHI",
            "AT",
            "AST",
            "BIO",
            "BOT",
            "CHM",
            "CHI",
            "CLA",
            "COM",
            "CRE",
            "DAN",
            "EAS",
            "ECO",
            "EDU",
            "ENG",
            "ES",
            "FLM",
            "FYS",
            "FRH",
            "GWS",
            "GEO",
            "GER",
            "GIS",
            "GOV",
            "GRK",
            "HBR",
            "SPA",
            "HIS",
            "HMD",
            "IS",
            "CRT",
            "DAT",
            "ENT",
            "FDP",
            "GC",
            "MRC",
            "PAX",
            "PKP",
            "PBH",
            "SJS",
            "ITL",
            "JPN",
            "JS",
            "LAT",
            "LA",
            "LIN",
            "MAT",
            "MSM",
            "MUS",
            "NEU",
            "PHI",
            "PHE",
            "PHY",
            "PSY",
            "RUS",
            "SLA",
            "SOC",
            "STA",
            "THE"
        ],
        "sel_title": "",
        "sel_to_cred": ""
    }
    r = requests.post(url, headers=headers, data=data)
    return r.content


def parse_data(fetched_content: bytes) -> Dict[str, Dict]:
    soup = BeautifulSoup(fetched_content, "html.parser")
    raw_classes = soup.find("table", {"class": "bwckschd"}).findAll(
        "td", {"class": "bwckschd_det"})
    parsed_classes = [
        raw_classes[i:i + 19] for i in range(0, len(raw_classes), 19)
    ]
    classes = {}
    date_time_separator = "%"
    for cls in parsed_classes:
        cls_data = {
            "CRN": cls[0].string.strip() if cls[0].string else None,
            "dept": cls[1].string.strip() if cls[1].string else None,
            "code": cls[2].string.strip() if cls[2].string else None,
            "section": cls[3].string.strip() if cls[3].string else None,
            "name": " ".join(cls[6].string.strip().split()) if cls[6].string else None,
            "date": cls[8].get_text(separator=date_time_separator).strip().split(date_time_separator) if cls[8].get_text(separator=date_time_separator) else None,
            "time": cls[9].get_text(separator=date_time_separator).strip().split(date_time_separator) if cls[9].get_text(separator=date_time_separator) else None,
            "instructor": cls[-1].string.strip() if cls[-1].string else None,
            "credits": cls[4].string.strip() if cls[4] .string else None,
            "attrs": cls[7].string.strip() if cls[7].string else None,
        }
        # crn = cls[0].string.strip()
        course_init = cls[1].string.strip() + cls[2].string.strip()
        if course_init in classes:
            classes[course_init].append(cls_data)
        else:
            classes[course_init] = [cls_data]

    return classes


def save_data(classes: Dict[str, Dict]) -> None:
    with open("classes2.json", "w") as f:
        json.dump(classes, f)


if __name__ == "__main__":
    update_classes()
