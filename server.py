#!/usr/bin/env python
# -*- coding: utf-8 -*-
# by vellhe 2017/7/9
from flask import Flask, abort, request, jsonify
import json
import csv
import pandas
#
app = Flask(__name__)

# 测试数据暂时存放
csv_reader=csv.reader(open('./data/epidemic/time_series_stringency.csv',encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
time_series_stringency = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    time_series_stringency.append(dictmp)


csv_reader=csv.reader(open('./data/epidemic/time_series_covid_19_deaths.csv',encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
time_series_covid_19_deaths = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    time_series_covid_19_deaths.append(dictmp)

csv_reader = csv.reader(open('./data/epidemic/time_series_covid_19_deaths_everyday.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
time_series_covid_19_deaths_everyday = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    time_series_covid_19_deaths_everyday.append(dictmp)

csv_reader = csv.reader(open('./data/epidemic/time_series_covid_19_recovered.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
time_series_covid_19_recovered = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    time_series_covid_19_recovered.append(dictmp)

csv_reader = csv.reader(open('./data/epidemic/time_series_covid_19_recovered_everyday.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
time_series_covid_19_recovered_everyday = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    time_series_covid_19_recovered_everyday.append(dictmp)

csv_reader = csv.reader(open('./data/epidemic/SEIR_prediction.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
SEIR_prediction = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    SEIR_prediction.append(dictmp)

csv_reader = csv.reader(open('./data/epidemic/age_distribution.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
age_distribution = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    age_distribution.append(dictmp)

csv_reader = csv.reader(open('./data/epidemic/area_and_pop.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
area_and_pop = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    area_and_pop.append(dictmp)

csv_reader = csv.reader(open('./data/epidemic/time_series_event.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
time_series_event = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    time_series_event.append(dictmp)

# mapPart
csv_reader = csv.reader(open('./data/epidemic/time_series_covid_19_confirmed.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
time_series_covid_19_confirmed = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    time_series_covid_19_confirmed.append(dictmp)

csv_reader = csv.reader(open('./data/epidemic/time_series_covid_19_deaths.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
time_series_covid_19_deaths = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    time_series_covid_19_deaths.append(dictmp)

csv_reader = csv.reader(open('./data/epidemic/time_series_covid_19_recovered.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
time_series_covid_19_recovered = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    time_series_covid_19_recovered.append(dictmp)

csv_reader = csv.reader(open('./data/policy/covid_stringency_index.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
covid_stringency_index = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    covid_stringency_index.append(dictmp)

csv_reader = csv.reader(open('./data/policy/school_closures_covid.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
school_closures_covid = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    school_closures_covid.append(dictmp)

csv_reader = csv.reader(open('./data/policy/public_campaigns_covid.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
public_campaigns_covid = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    public_campaigns_covid.append(dictmp)

csv_reader = csv.reader(open('./data/policy/workplace_closures_covid.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
workplace_closures_covid = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    workplace_closures_covid.append(dictmp)

csv_reader = csv.reader(open('./data/policy/public_events_covid.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
public_events_covid = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    public_events_covid.append(dictmp)

csv_reader = csv.reader(open('./data/policy/public_gathering_rules_covid.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
public_gathering_rules_covid = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    public_gathering_rules_covid.append(dictmp)

csv_reader = csv.reader(open('./data/policy/public_transport_covid.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
public_transport_covid = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    public_transport_covid.append(dictmp)

csv_reader = csv.reader(open('./data/policy/stay_at_home_covid.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
stay_at_home_covid = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    stay_at_home_covid.append(dictmp)

csv_reader = csv.reader(open('./data/policy/internal_movement_covid.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
internal_movement_covid = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    internal_movement_covid.append(dictmp)

csv_reader = csv.reader(open('./data/policy/international_travel_covid.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
international_travel_covid = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    international_travel_covid.append(dictmp)

csv_reader = csv.reader(open('./data/policy/covid_19_testing_policy.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
covid_19_testing_policy = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    covid_19_testing_policy.append(dictmp)

csv_reader = csv.reader(open('./data/policy/covid_contact_tracing.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
covid_contact_tracing = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    covid_contact_tracing.append(dictmp)


csv_reader = csv.reader(open('./data/epidemic/time_series_covid_19_confirm_now.csv', encoding='UTF-8-sig'))
filedata = []
for row in csv_reader:
    filedata.append(row)
keys = filedata[0]
time_series_covid_19_confirm_now = []
for i in range(1, len(filedata)):
    dictmp = {}
    for j in range(len(filedata[i])):
        dictmp[keys[j]] = filedata[i][j]
    time_series_covid_19_confirm_now.append(dictmp)

k_illdis=['Slovenia','Austria','Canada','Czechia','Germany','Hungary','Italy','Singapore','covid_age_distribution']
covid_age_distribution = []
for cnt in range(9):
    csv_reader = csv.reader(open('./data/epidemic/covid_age_distribution/'+k_illdis[cnt]+'.csv', encoding='UTF-8-sig'))
    filedata = []
    for row in csv_reader:
        filedata.append(row)
    keys = filedata[0]
    covid_age_distribution_tmp = []
    for i in range(1, len(filedata)):
        dictmp = {}
        for j in range(len(filedata[i])):
            dictmp[keys[j]] = filedata[i][j]
        covid_age_distribution_tmp.append(dictmp)
    covid_age_distribution.append(covid_age_distribution_tmp)

@app.route('/time_series_stringency', methods=['GET'])
def get_task1():
    # data = {"time_series_stringency":time_series_stringency}
    # return json.dumps(data)
    callback = request.args.get('invoker')
    data = {"time_series_stringency":time_series_stringency}
    print(callback)
    return callback + '(' + json.dumps(data) + ')'

@app.route('/time_series_covid_19_deaths', methods=['GET'])
def get_task2():
    callback = request.args.get('invoker')
    data = {"time_series_covid_19_deaths":time_series_covid_19_deaths}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/time_series_covid_19_deaths_everyday', methods=['GET'])
def get_task3():
    callback = request.args.get('invoker')
    data = {"time_series_covid_19_deaths_everyday":time_series_covid_19_deaths_everyday}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/time_series_covid_19_recovered', methods=['GET'])
def get_task4():
    callback = request.args.get('invoker')
    data = {"time_series_covid_19_recovered":time_series_covid_19_recovered}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/time_series_covid_19_recovered_everyday', methods=['GET'])
def get_task5():
    callback = request.args.get('invoker')
    data = {"time_series_covid_19_recovered_everyday":time_series_covid_19_recovered_everyday}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/SEIR_prediction', methods=['GET'])
def get_task6():
    callback = request.args.get('invoker')
    data = {"SEIR_prediction":SEIR_prediction}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/age_distribution', methods=['GET'])
def get_task7():
    callback = request.args.get('invoker')
    data = {"age_distribution":age_distribution}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/area_and_pop', methods=['GET'])
def get_task8():
    callback = request.args.get('invoker')
    data = {"area_and_pop":area_and_pop}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/time_series_event', methods=['GET'])
def get_task9():
    callback = request.args.get('invoker')
    data = {"time_series_event":time_series_event}
    return callback + '(' + json.dumps(data) + ')'

# mapPart
@app.route('/time_series_covid_19_confirmed', methods=['GET'])
def get_task10():
    callback = request.args.get('invoker')
    data = {"time_series_covid_19_confirmed":time_series_covid_19_confirmed}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/time_series_covid_19_deaths', methods=['GET'])
def get_task11():
    callback = request.args.get('invoker')
    data = {"time_series_covid_19_deaths":time_series_covid_19_deaths}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/time_series_covid_19_recovered', methods=['GET'])
def get_task12():
    callback = request.args.get('invoker')
    data = {"time_series_covid_19_recovered":time_series_covid_19_recovered}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/covid_stringency_index', methods=['GET'])
def get_task13():
    callback = request.args.get('invoker')
    data = {"covid_stringency_index":covid_stringency_index}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/school_closures_covid', methods=['GET'])
def get_task14():
    callback = request.args.get('invoker')
    data = {"school_closures_covid":school_closures_covid}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/public_campaigns_covid', methods=['GET'])
def get_task15():
    callback = request.args.get('invoker')
    data = {"public_campaigns_covid":public_campaigns_covid}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/workplace_closures_covid', methods=['GET'])
def get_task16():
    callback = request.args.get('invoker')
    data = {"workplace_closures_covid":workplace_closures_covid}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/public_events_covid', methods=['GET'])
def get_task17():
    callback = request.args.get('invoker')
    data = {"public_events_covid":public_events_covid}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/public_gathering_rules_covid', methods=['GET'])
def get_task18():
    callback = request.args.get('invoker')
    data = {"public_gathering_rules_covid":public_gathering_rules_covid}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/public_transport_covid', methods=['GET'])
def get_task19():
    callback = request.args.get('invoker')
    data = {"public_transport_covid":public_transport_covid}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/stay_at_home_covid', methods=['GET'])
def get_task20():
    callback = request.args.get('invoker')
    data = {"stay_at_home_covid":stay_at_home_covid}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/internal_movement_covid', methods=['GET'])
def get_task21():
    callback = request.args.get('invoker')
    data = {"internal_movement_covid":internal_movement_covid}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/international_travel_covid', methods=['GET'])
def get_task22():
    callback = request.args.get('invoker')
    data = {"international_travel_covid":international_travel_covid}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/covid_19_testing_policy', methods=['GET'])
def get_task23():
    callback = request.args.get('invoker')
    data = {"covid_19_testing_policy":covid_19_testing_policy}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/covid_contact_tracing', methods=['GET'])
def get_task24():
    callback = request.args.get('invoker')
    data = {"covid_contact_tracing":covid_contact_tracing}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/time_series_covid_19_confirm_now', methods=['GET'])
def get_task25():
    callback = request.args.get('invoker')
    data = {"time_series_covid_19_confirm_now":time_series_covid_19_confirm_now}
    return callback + '(' + json.dumps(data) + ')'

@app.route('/covid_age_distribution0', methods=['GET'])
def get_task26():
    callback = request.args.get('invoker')
    data = {"covid_age_distribution0": covid_age_distribution[0]}
    return callback + '(' + json.dumps(data) + ')'
@app.route('/covid_age_distribution1', methods=['GET'])
def get_task27():
    callback = request.args.get('invoker')
    data = {"covid_age_distribution1": covid_age_distribution[1]}
    return callback + '(' + json.dumps(data) + ')'
@app.route('/covid_age_distribution2', methods=['GET'])
def get_task28():
    callback = request.args.get('invoker')
    data = {"covid_age_distribution2": covid_age_distribution[2]}
    return callback + '(' + json.dumps(data) + ')'
@app.route('/covid_age_distribution3', methods=['GET'])
def get_task29():
    callback = request.args.get('invoker')
    data = {"covid_age_distribution3": covid_age_distribution[3]}
    return callback + '(' + json.dumps(data) + ')'
@app.route('/covid_age_distribution4', methods=['GET'])
def get_task30():
    callback = request.args.get('invoker')
    data = {"covid_age_distribution4": covid_age_distribution[4]}
    return callback + '(' + json.dumps(data) + ')'
@app.route('/covid_age_distribution5', methods=['GET'])
def get_task31():
    callback = request.args.get('invoker')
    data = {"covid_age_distribution5": covid_age_distribution[5]}
    return callback + '(' + json.dumps(data) + ')'
@app.route('/covid_age_distribution6', methods=['GET'])
def get_task32():
    callback = request.args.get('invoker')
    data = {"covid_age_distribution6": covid_age_distribution[6]}
    return callback + '(' + json.dumps(data) + ')'
@app.route('/covid_age_distribution7', methods=['GET'])
def get_task33():
    callback = request.args.get('invoker')
    data = {"covid_age_distribution7": covid_age_distribution[7]}
    return callback + '(' + json.dumps(data) + ')'
@app.route('/covid_age_distribution8', methods=['GET'])
def get_task34():
    callback = request.args.get('invoker')
    data = {"covid_age_distribution8": covid_age_distribution[8]}
    return callback + '(' + json.dumps(data) + ')'


if __name__ == "__main__":
    # 将host设置为0.0.0.0，则外网用户也可以访问到这个服务
    # app.run(host="0.0.0.0", port=8383, debug=True)
    app.run(debug=True)
