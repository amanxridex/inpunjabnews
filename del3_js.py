with open('index.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# The error is at switchRegion. We know switchRegion is defined and called.
# Let's just delete the first 95 lines. Let's check if line 95 is indeed the switchRegion call.
# Actually, I can just find the index of the line containing "switchRegion('amritsar'"
end_idx = -1
for i, line in enumerate(lines):
    if "switchRegion('amritsar'" in line:
        end_idx = i
        break

if end_idx != -1:
    new_lines = lines[end_idx + 1:]
    with open('index.js', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print(f"Deleted up to line {end_idx + 1}")
else:
    print("Could not find switchRegion call")
