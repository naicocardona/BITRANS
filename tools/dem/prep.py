import sys, json, subprocess
sys.path.insert(0, ".."); from script import TK, SH
S = "/tmp/claude-0/-home-user-BITRANS/e6df0451-e894-56da-93e1-0311b18c22a2/scratchpad"
for name, L in [("tiktok", TK), ("shorts", SH)]:
    txt = " ".join(c for _, _, c in L).replace("…", ",")
    open(f"{name}.txt", "w").write(txt)
    subprocess.run(["python3", "-I", f"{S}/tools/align_words.py", f"{name}.wav", f"{name}.txt", f"{name}.words.json"], check=True)
    d = json.load(open(f"{name}.words.json")); d["display"] = d["words"]; json.dump(d, open(f"{name}.words.json", "w"), ensure_ascii=False)
