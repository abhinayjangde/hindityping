const storyPracticeLines = [
  "राम एक अच्छा लड़का था।",
  "राम हर दिन घर पर रहता था।",
  "एक दिन राम ने एक गरीब नर की मदद की।",
  "वह नर बहुत खुश हुआ।",
  'राम ने कहा, "हम सब को अच्छे कर्म करने चाहिए।"',
  "अच्छे कर्म से मन को सुख मिलता है।",
  "राम और हरि अच्छे मित्र थे।",
  "वे हर दिन मिलकर काम करते थे।",
  "उनका जीवन सरल और सुखी था।",
  "सीख: हमें हमेशा अच्छे कर्म करने चाहिए।"
];

const practiceText = "ेकिही ष्यसार";

function repeatedLines(text: string): string[] {
  return Array.from({ length: 10 }, () => text);
}

export function getPracticeLines(lessonIndex: number, partIndex: number): string[] {
  if (lessonIndex === 6 && partIndex === 0) {
    return storyPracticeLines;
  }

  if (lessonIndex === 0 && partIndex === 1) {
    return repeatedLines("dkdk dkdk dkdk dkdk dkdk dkdk dkdk dkdk dkdk dkdk");
  }

  if (lessonIndex === 0 && partIndex === 2) {
    return repeatedLines("dkdh dkdh dkdh dkdh dkdh dkdh dkdh dkdh dkdh dkdh");
  }

  if (lessonIndex === 0 && partIndex === 3) {
    return repeatedLines("gd gd gd gd gd gd gd gd gd gd");
  }

  if (lessonIndex === 0 && partIndex === 4) {
    return repeatedLines("dj dj dj dj dj dj dj dj dj dj");
  }

  if (lessonIndex === 1 && partIndex === 0) {
    return repeatedLines(
      "zxcvb /.,mn zxcvb /.,mn zxcvb /.,mn zxcvb /.,mn zxcvb /.,mn zxcvb /.,mn zxcvb /.,mn zxcvb /.,mn zxcvb /.,mn zxcvb /.,mn"
    );
  }

  return repeatedLines(Array(9).fill(practiceText).join(" "));
}
