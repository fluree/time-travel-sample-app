import requests
import pandas as pd
import time

# Read CSV file into a pandas DataFrame
csv_file_path = 'data/hapiscore_whr.csv'
df = pd.read_csv(csv_file_path, skiprows=0, header=None)

# Extract header and data rows
header = df.iloc[0, :].tolist()
data_rows = df.iloc[1:, :]

# Convert to dictionary
result = {}
for _, row in data_rows.iterrows():
    country = row[0]
    for i in range(1, len(row)):
        year = int(header[i])
        score = str(row[i]) if pd.notna(row[i]) else "NaN"
        if year not in result:
            result[year] = []
        result[year].append({"country": country, "year": year, "score": score})


delete = {}
for year, entries in result.items():
    print(f"Year {year}:")
    dataset_id = "test2"
    api_key = "FQse8miotpUMcU8NKT5QPmJ1cSQe3VBNZrlOBb8_bs0WO9IWUj-pOHu8CVFbs-ZMFlQqSQpYMRu5ts_i_KixWg"

    transaction = {
        "@context": {},
        "ledger": dataset_id,
        "where": {
            "@id": "?subject",
            "country": "?country",
            "?p": "?o"
        },
        "delete": {
            "@id": "?s",
            "?p": "?o"
        },
        "insert": result[year],
    }

    url = "http://localhost:58090/fluree/transact"  # change to local host
    # url = "http://data.flur.ee/fluree/transact"
    headers = {
        "Content-Type": "application/json",
        "Authorization": api_key,
        'Accept': 'text/plain'
    }

    response = requests.post(url, headers=headers,
                             json=transaction)
    data = response.json()
    print(data)
    # time.sleep(5)
