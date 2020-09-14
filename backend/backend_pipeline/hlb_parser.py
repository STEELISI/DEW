from enum import Enum
import sys

# from DewFunctions.Generators.bash.bash import Generator as bashGenerator
from DewFunctions.UI.HighLevelBehaviorLanguage.hlb_parser import HLBParser, HLBHintType
# from DewFunctions.Translators.magi.magiparser import GeneralParseMagi

#import DEWAPI

# C:\Users\kishu\OutneDrive\Desktop\isitest\DEW\backend\DEWAPI\api\private\services
# print
h = HLBParser([])
l = ["actor0 run1", "actor1 run1"]
print(h.parse_with_labels(l))