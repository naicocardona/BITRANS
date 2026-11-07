import sys, json, subprocess
sys.path.insert(0, ".."); from script import TK, SH
S = __import__("os").environ.get("BITRANS_WORK", "/home/user/bitrans_work")
for name, L in [("tiktok", TK), ("shorts", SH)]:
    txt = " ".join(c for _, _, c in L).replace("…", ",")
    open(f"{name}.txt", "w").write(txt)
    subprocess.run(["python3", "-I", f"{S}/tools/align_words.py", f"{name}.wav", f"{name}.txt", f"{name}.words.json"], check=True)
    d = json.load(open(f"{name}.words.json")); d["display"] = d["words"]; json.dump(d, open(f"{name}.words.json", "w"), ensure_ascii=False)
