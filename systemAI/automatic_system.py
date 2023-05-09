import numpy as np
import pandas as pd
from sklearn.metrics import confusion_matrix, accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import math
import pickle

def entropy(labels):
    n = len(labels)
    counts = {}
    for label in labels:
        # print(label)
        if label in counts:
            counts[label] +=1
        else:
            counts[label] = 1
    
    entropy = 0
    for count in counts.values():
        prob = count/n
        entropy -= prob * math.log2(prob)
    return entropy

def split_dataset(X, y, feature_index, threshold):
    left_X , left_y ,  right_X , right_y = [], [], [], []
    for i in range(len(X)):
        if X[i][feature_index] < threshold:
            left_X.append(X[i])
            left_y.append(y[i])
        else:
            right_X.append(X[i])
            right_y.append(y[i])
    return left_X, left_y, right_X, right_y

def find_best_split(X, y):
    best_feature_index = None
    best_threshold = None
    best_info_gain = -math.inf
    n_features = len(X[0])
    for feature_index in range(n_features):
        feature_values = set([X[i][feature_index] for i in range(len(X))])
        for threshold in feature_values:
            left_X, left_y, right_X, right_y = split_dataset(X, y, feature_index, threshold)
            info_gain = entropy(y) - len(left_y)/len(y)*entropy(left_y) - len(right_y)/len(y)*entropy(right_y)
            if info_gain > best_info_gain:
                best_feature_index = feature_index
                best_threshold = threshold
                best_info_gain = info_gain
    return best_feature_index, best_threshold, best_info_gain


def build_tree(X, y):
    if len(set(y)) == 1:
        # All labels are the same, return a leaf node
        return {'leaf': True, 'label': y[0]}
    best_feature_index, best_threshold, best_info_gain = find_best_split(X, y)
    if best_info_gain == 0:
        # No more information gain, return a leaf node
        return {'leaf': True, 'label': max(set(y), key=y.count)}
    left_X, left_y, right_X, right_y = split_dataset(X, y, best_feature_index, best_threshold)
    left_subtree = build_tree(left_X, left_y)
    right_subtree = build_tree(right_X, right_y)
    return {'leaf': False, 'feature_index': best_feature_index, 'threshold': best_threshold,
            'left_subtree': left_subtree, 'right_subtree': right_subtree}

def predict(tree, sample):
    if tree['leaf']:
        # If the current node is a leaf, return the predicted class
        return tree['label']
    if sample[tree['feature_index']] < tree['threshold']:
        # Traverse the left subtree if the sample's feature value is less than the threshold
        return predict(tree['left_subtree'], sample)
    else:
        # Traverse the right subtree if the sample's feature value is greater than or equal to the threshold
        return predict(tree['right_subtree'], sample)


sample = [28, 73, 150]  # Sample with 4 features
# temperature, soil moisture, luminance
X1 = [
    [28, 75, 100],
    [28, 60, 10000],
    [29, 40, 4000],
    [32, 20, 200],
    [33, 60, 5000],

    [28, 85, 2000],
    [28, 90, 1600],
    [30, 95, 3000],
    [32, 98, 5000],
    [31, 87, 2000],

    [28, 90, 1200],
    [28, 92, 800],
    [29, 88, 600],
    [30, 86, 1400],
    [31, 98, 1000],
    
    [25, 95, 3000],
    [25, 25, 200],
    [25, 45, 1000],
    [25, 65, 1500],
    [25, 75, 6000],
]
y1 = [
    1,
    1,
    1,
    1,
    1,

    1,
    1,
    1,
    1,
    1,
    
    0,
    0,
    0,
    0,
    0,
    
    0,
    0,
    0,
    0,
    0
]
tree1 = build_tree(X1, y1)
predicted_class = predict(tree1, sample)
print('Predicted class:', predicted_class)
water_pump_dt_path = 'water_pump_dt.pkl'
with open(water_pump_dt_path, 'wb') as f:
    pickle.dump(tree1, f)
    f.close()

# temperature, soil moisture, luminance 
X2 = [
    [28, 75, 1900],
    [29, 63, 10000],
    [30, 43, 4500],
    [31, 20, 2500],
    [32, 78, 5800],
    
    [28, 82, 10000],
    [28, 90, 10000],
    [29, 99, 4000],
    [32, 88, 2000],
    [33, 96, 5000],

    [28, 85, 1000],
    [28, 90, 1400],
    [30, 95, 900],
    [32, 98, 500],
    [31, 87, 200],

    [26, 90, 1200],
    [26, 92, 800],
    [25, 88, 600],
    [20, 86, 1400],
    [18, 98, 1000],
     
    [26, 90, 2200],
    [26, 92, 3800],
    [25, 88, 6000],
    [20, 86, 1600],
    [18, 98, 1900]
]
# control tarpaulin
y2 = [
    0,
    0,
    0,
    0,
    0,

    0,
    0,
    0,
    0,
    0,

    1,
    1,
    1,
    1,
    1,

    1,
    1,
    1,
    1,
    1,

    1,
    1,
    1,
    1,
    1
]
tree2 = build_tree(X2, y2)
predicted_class = predict(tree2, sample)
print('Predicted class:', predicted_class)
motor_dt_path = 'motor_dt.pkl'
with open(motor_dt_path, 'wb') as f:
    pickle.dump(tree2, f)
    f.close()
