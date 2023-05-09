import numpy as np
import pandas as pd
from sklearn.metrics import confusion_matrix, accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import math
import pickle
import csv


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

def build_and_save_dt(fileNameWithoutExt):
    with open(fileNameWithoutExt + '.csv', 'r') as f:
        data = list(csv.reader(f, delimiter=','))
        f.close()
    X1, y1 = [], []
    for ele in data:
        X1 += [[int(i) for i in ele[:-1]]]
        y1 += [int(ele[-1])]
    tree1 = build_tree(X1, y1)
    water_pump_dt_path = fileNameWithoutExt + '.pkl'
    with open(water_pump_dt_path, 'wb') as f:
        pickle.dump(tree1, f)
        f.close()
def load_dt(fileName):
    with open(fileName, 'rb') as f:
        tree = pickle.load(f)
        f.close()
    return tree

# build_and_save_dt('water_pump_dt')
# build_and_save_dt('motor_dt')
# dt = load_dt('water_pump_dt.pkl')
# sample = [27, 95, 1000]
# print(predict(dt, sample))