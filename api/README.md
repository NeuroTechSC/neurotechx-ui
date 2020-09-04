### Setup

```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
python api/api.py runserver -d -r

```
### After changing database
```
python api/api.py db migrate
!!!comment out anything with sqlite_sequence and sqlite_master!!
python api/api.py db upgrade