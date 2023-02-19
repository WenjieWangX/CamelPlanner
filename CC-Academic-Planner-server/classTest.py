# import json
# from typing import Dict
import numpy as np
import scipy
# import requests
# from bs4 import BeautifulSoup


# def update_classes() -> None:
#     raw_data = fetch_data()


# def fetch_data() -> bytes:

#     url = "https://ssbprod.conncoll.edu/CONN/bwckschd.p_get_crse_unsec"

#     payload = "term_in=202290&begin_ap=a&begin_hh=0&begin_mi=0&end_ap=a&end_hh=0&end_mi=0&sel_attr=dummy&sel_attr=%25&sel_camp=dummy&sel_crse=&sel_day=dummy&sel_from_cred=&sel_insm=dummy&sel_instr=dummy&sel_instr=%25&sel_levl=dummy&sel_ptrm=dummy&sel_schd=dummy&sel_sess=dummy&sel_subj=dummy&sel_subj=ACC&sel_subj=AFR&sel_subj=ASL&sel_subj=AMS&sel_subj=ANT&sel_subj=ARA&sel_subj=ARC&sel_subj=ART&sel_subj=AHI&sel_subj=AT&sel_subj=AST&sel_subj=BIO&sel_subj=BOT&sel_subj=CHM&sel_subj=CHI&sel_subj=CLA&sel_subj=COM&sel_subj=CRE&sel_subj=DAN&sel_subj=EAS&sel_subj=ECO&sel_subj=EDU&sel_subj=ENG&sel_subj=ES&sel_subj=FLM&sel_subj=FYS&sel_subj=FRH&sel_subj=GWS&sel_subj=GEO&sel_subj=GER&sel_subj=GIS&sel_subj=GOV&sel_subj=GRK&sel_subj=HBR&sel_subj=SPA&sel_subj=HIS&sel_subj=HMD&sel_subj=IS&sel_subj=CRT&sel_subj=DAT&sel_subj=ENT&sel_subj=FDP&sel_subj=GC&sel_subj=MRC&sel_subj=PAX&sel_subj=PKP&sel_subj=PBH&sel_subj=SJS&sel_subj=ITL&sel_subj=JPN&sel_subj=JS&sel_subj=LAT&sel_subj=LA&sel_subj=LIN&sel_subj=MAT&sel_subj=MSM&sel_subj=MUS&sel_subj=NEU&sel_subj=PHI&sel_subj=PHE&sel_subj=PHY&sel_subj=PSY&sel_subj=RUS&sel_subj=SLA&sel_subj=SOC&sel_subj=STA&sel_subj=THE&sel_title=&sel_to_cred="
#     headers = {
#         'content-type': "application/x-www-form-urlencoded",
#         'cache-control': "no-cache",
#     }

#     response = requests.request("POST", url, data=payload, headers=headers)

#     print(response.text)


# if __name__ == "__main__":
#     update_classes()
prop_uni = scipy.stats.uniform(-3, 6)
for i in range(10):
    print(prop_uni.pdf(i-3))
